import gulpWatch from 'gulp-watch'
import html from './html.js'
import images from './images.js'
import scripts from './scripts.js'
import styles from './styles.js'
import fonts from './fonts.js'
import video from './video.js'
import { PATHS } from '../config/paths.js'

export default function watcher() {
    gulpWatch(PATHS.watch.twig, html)
    gulpWatch(PATHS.watch.images, images)
    gulpWatch(PATHS.watch.styles, styles)
    gulpWatch(PATHS.watch.scripts, scripts)
    gulpWatch(PATHS.watch.fonts, fonts)
    gulpWatch(PATHS.watch.video, video)
}
