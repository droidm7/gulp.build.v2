import { v4 as uuidv4 } from 'uuid'

export default function generateHash() {
    const str = uuidv4()

    return str.replaceAll('-', '').slice(0, str.length / 2)
}
