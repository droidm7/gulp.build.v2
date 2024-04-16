import gulp from 'gulp'
import newer from 'gulp-newer'
import webp from 'gulp-webp'
import imagemin from 'gulp-imagemin'
import browserSync from 'browser-sync'
import gulpIf from 'gulp-if'
import { PATHS } from '../config/paths.js'

const IMAGE_OPTIMIZE = true

export default function images() {
    return (
        gulp
            .src(PATHS.src.images)
            .pipe(newer(PATHS.dist.images))
            .pipe(
                gulpIf(
                    IMAGE_OPTIMIZE,
                    imagemin({
                        progressive: true,
                        svgoPlugins: [{ removeViewBox: false }],
                        interlaced: true,
                        optimizationLevel: 3, // от 0 до 7
                    }),
                ),
            )
            .pipe(gulp.dest(PATHS.dist.images))
            .pipe(gulp.src(PATHS.src.images))
            // .pipe(newer(PATHS.dist.images))
            .pipe(
                webp({
                    quality: 90,
                }),
            )
            .pipe(gulp.dest(PATHS.dist.images))
            .pipe(browserSync.stream())
    )
}
