import { join } from 'node:path';
import { mkdir } from 'fs/promises';

export async function mkdirHandler(dirName) {
    if (dirName) {
        const fullPath = join(process.cwd(), dirName);
        await mkdir(fullPath, { recursive: true });
        console.log(`Directory '${dirName}' created at ${fullPath}`);
    } else {
        throw new Error('Directory name not set');
    }
}
