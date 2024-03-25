import gulp from 'gulp'
import html from './gulp/tasks/html.js'
import clean from './gulp/tasks/clean.js'
import styles from './gulp/tasks/styles.js'
import scripts from './gulp/tasks/scripts.js'

gulp.task('build', gulp.parallel(html, styles, scripts))
gulp.task('default', gulp.series(clean, 'build'))
