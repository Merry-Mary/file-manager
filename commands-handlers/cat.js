import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { resolve } from 'path';
import { once } from 'node:events';

export async function catHandler(filePath) {
    try {
        if (!filePath) {
            throw new Error('File path is not defined');
        }

        const path = resolve(filePath);
        const stats = await stat(path);

        if (!stats.isFile()) {
            throw new Error();
        }

        const readable = createReadStream(path, { encoding: 'utf8' });
        readable.pipe(process.stdout);
        await once(readable, 'end');
    }
    catch(error) {
        console.error('Operation failed: ', error.message);
    }
}
