import gulp from 'gulp'
import newer from 'gulp-newer'
import browserSync from 'browser-sync'
import { PATHS } from '../config/paths.js'

export default function fonts() {
    return gulp
        .src(PATHS.src.video)
        .pipe(newer(PATHS.dist.video))
        .pipe(gulp.dest(PATHS.dist.video))
        .pipe(browserSync.stream())
}
