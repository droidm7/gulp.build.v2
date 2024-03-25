import browserSync from 'browser-sync'

export default function server() {
    browserSync.init({
        port: 3002,
        ghostMode: false,
        injectchanges: true,
        open: false,
        server: {
            baseDir: './dist',
        },
    })
}
