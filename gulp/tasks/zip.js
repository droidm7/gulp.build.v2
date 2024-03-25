import gulp from 'gulp'
import GulpZip from 'gulp-zip'

export default function zip() {
    return gulp
        .src(['**/*', '!node_modules/*/**', '!node_modules'])
        .pipe(GulpZip('build.zip'))
        .pipe(gulp.dest('./'))
}
