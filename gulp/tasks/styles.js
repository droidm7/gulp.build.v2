import gulp from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import groupCssMediaQueries from 'gulp-group-css-media-queries'
import cssmin from 'gulp-cssmin'
import browserSync from 'browser-sync'
import generateHash from '../uttils/generateHash.js'
import replace from 'gulp-replace'
import { PATHS } from '../config/PATHS.js'

const sass = gulpSass(dartSass)
const hash = generateHash()

export default function styles() {
    return gulp
        .src(PATHS.src.styles)
        .pipe(
            sass({
                outputStyle: 'expanded',
            }).on('error', sass.logError),
        )
        .pipe(groupCssMediaQueries())
        .pipe(
            autoprefixer({
                cascade: true,
                grid: true,
                overrideBrowserslist: ['last 5 versions'],
            }),
        )
        .pipe(cssmin())
        .pipe(gulp.dest(PATHS.dist.styles))
        .pipe(browserSync.stream())
        .on('end', () => {
            gulp.src(PATHS.dist.html + '*.html')
                .pipe(replace('style.[bundle].css', `style.${hash}.min.css`))
                .pipe(gulp.dest(PATHS.dist.html))
        })
}
