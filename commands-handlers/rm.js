import { unlink } from 'fs/promises';
import { resolve } from 'node:path';

export async function rmHandler(file) {
    if (file) {
        await unlink(resolve(file));
        console.log('File removed');
    } else {
        throw Error('File not set');
    }
}