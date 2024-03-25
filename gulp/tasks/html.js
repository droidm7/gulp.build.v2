import gulp from 'gulp'
import plumber from 'gulp-plumber'
import twig from 'gulp-twig'
import htmlmin from 'gulp-htmlmin'
import browserSync from 'browser-sync'
import notify from 'gulp-notify'
import flatten from 'gulp-flatten'
import { readFileSync } from 'fs'
import { PATHS } from '../config/paths.js'

export default function html() {
    const data = readFileSync('./data.json', 'utf-8')
    const dataJSON = JSON.parse(data)

    return gulp
        .src(PATHS.src.twig)
        .pipe(
            plumber({
                errorHandler: notify.onError('Error: <%= error.message %>'),
            }),
        )
        .pipe(
            twig({
                data: dataJSON,
            }),
        )
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(flatten({ includeParents: 0 }))
        .pipe(gulp.dest(PATHS.dist.html))
        .pipe(browserSync.stream())
}
