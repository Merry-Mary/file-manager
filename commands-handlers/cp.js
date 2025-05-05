import { createReadStream, createWriteStream } from 'node:fs';
import { resolve, parse } from 'node:path';

export async function cpHandler(filePath, newPath) {
    const path = resolve(filePath);
    const { base } = parse(path);
    const readable = createReadStream(path);
    const newFilePath = resolve(newPath, base)
    const writable = createWriteStream(newFilePath);
    readable.pipe(writable);
}