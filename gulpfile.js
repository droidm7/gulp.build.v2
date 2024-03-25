import gulp from 'gulp'
import html from './gulp/tasks/html.js'

gulp.task('build', gulp.parallel(html))
gulp.task('default', gulp.parallel('build'))
