import gulp from 'gulp'
import html from './gulp/tasks/html.js'
import clean from './gulp/tasks/clean.js'
import styles from './gulp/tasks/styles.js'
import scripts from './gulp/tasks/scripts.js'
import fonts from './gulp/tasks/fonts.js'
import images from './gulp/tasks/images.js'
import zip from './gulp/tasks/zip.js'
import watcher from './gulp/tasks/watcher.js'
import server from './gulp/tasks/server.js'

gulp.task('build', gulp.parallel(html, styles, images, scripts, fonts))

gulp.task('production', gulp.series(clean, 'build'))

gulp.task('zip', gulp.series(clean, 'build', zip))

gulp.task('default', gulp.parallel('build', watcher, server))
