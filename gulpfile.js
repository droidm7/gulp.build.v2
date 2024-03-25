import gulp from 'gulp'
import html from './gulp/tasks/html.js'
import clean from './gulp/tasks/clean.js'
import styles from './gulp/tasks/styles.js'
import scripts from './gulp/tasks/scripts.js'
import fonts from './gulp/tasks/fonts.js'
import images from './gulp/tasks/images.js'

gulp.task('build', gulp.parallel(html, styles, scripts, fonts, images))
gulp.task('default', gulp.series(clean, 'build'))
