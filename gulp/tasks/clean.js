import { deleteAsync } from 'del'
import { PATHS } from '../config/paths.js'

export default function clean() {
    return deleteAsync(PATHS.clean)
}
