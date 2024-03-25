import gulp from 'gulp'
import webpack from 'webpack-stream'
import browserSync from 'browser-sync'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import replace from 'gulp-replace'
import rename from 'gulp-rename'
import generateHash from '../uttils/generateHash.js'
import { PATHS } from '../config/paths.js'

const hash = generateHash()
const jsFileName = `app.${hash}.min.js`

export default function scripts() {
    return gulp
        .src(PATHS.src.scripts)
        .pipe(
            plumber({
                errorHandler: notify.onError('Error: <%= error.message %>'),
            }),
        )
        .pipe(
            webpack({
                mode: 'production',
                output: {
                    filename: `app.js`,
                    libraryTarget: 'umd',
                },
                module: {
                    rules: [
                        {
                            test: /\.js$/,
                            exclude: /node_modules/,
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    presets: ['@babel/preset-env'],
                                },
                            },
                        },
                    ],
                },
            }),
        )
        .pipe(rename(jsFileName))
        .pipe(gulp.dest(PATHS.dist.scripts))
        .pipe(browserSync.stream())
        .on('end', () => {
            gulp.src(PATHS.dist.html + '*.html')
                .pipe(replace('app.[bundle].js', jsFileName))
                .pipe(gulp.dest(PATHS.dist.html))
        })
}
