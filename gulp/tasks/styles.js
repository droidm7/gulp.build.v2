import gulp from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import groupCssMediaQueries from 'gulp-group-css-media-queries'
import browserSync from 'browser-sync'
import generateHash from '../uttils/generateHash.js'
import replace from 'gulp-replace'
import rename from 'gulp-rename'
import sassGlob from 'gulp-sass-glob'
import gulpIf from 'gulp-if'
import { PATHS } from '../config/PATHS.js'
import { isProduction } from '../uttils/isProduction.js'
import gulpCleanCss from 'gulp-clean-css'

const IS_PROD = isProduction()
const sass = gulpSass(dartSass)
const hash = generateHash()
const styleFilename = `style.${hash}.min.css`

export default function styles() {
    return gulp
        .src(PATHS.src.styles)
        .pipe(sassGlob())
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
        .pipe(gulpIf(IS_PROD, gulpCleanCss()))
        .pipe(gulpIf(IS_PROD, rename(styleFilename)))
        .pipe(gulp.dest(PATHS.dist.styles))
        .pipe(browserSync.stream())
        .on('end', () => {
            if (!IS_PROD) return

            const regexp = /(href="\.\/assets\/css\/)style\.css(")/gi

            gulp.src(PATHS.dist.html + '*.html')
                .pipe(
                    replace(regexp, (_, $1, $2) => {
                        return `${$1}${styleFilename}${$2}`
                    }),
                )
                .pipe(gulp.dest(PATHS.dist.html))
        })
}
