import gulp from 'gulp'
import newer from 'gulp-newer'
import browserSync from 'browser-sync'
import { PATHS } from '../config/paths.js'

export default function fonts() {
    return gulp
        .src(PATHS.src.fonts)
        .pipe(newer(PATHS.dist.fonts))
        .pipe(gulp.dest(PATHS.dist.fonts))
        .pipe(browserSync.stream())
}
