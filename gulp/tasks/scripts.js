import gulp from 'gulp'
import webpack from 'webpack-stream'
import browserSync from 'browser-sync'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import replace from 'gulp-replace'
import rename from 'gulp-rename'
import { EsbuildPlugin } from 'esbuild-loader'
import generateHash from '../uttils/generateHash.js'
import { PATHS } from '../config/paths.js'
import { isProduction } from '../uttils/isProduction.js'

const IS_PROD = isProduction()
const hash = generateHash()
const jsFileName = IS_PROD ? `app.${hash}.min.js` : 'app.js'

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
                optimization: {
                    minimizer: [
                        new EsbuildPlugin({
                            target: 'es2015',
                        }),
                    ],
                },
                module: {
                    rules: [
                        {
                            test: /\.m?js$/,
                            exclude: /node_modules/,
                            use: {
                                loader: 'esbuild-loader',
                                options: { target: 'es2015' },
                            },
                            resolve: {
                                fullySpecified: false,
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
            const replaceName = IS_PROD ? jsFileName : 'app.js'

            gulp.src(PATHS.dist.html + '*.html')
                .pipe(replace('app.[bundle].js', replaceName))
                .pipe(gulp.dest(PATHS.dist.html))
        })
}
