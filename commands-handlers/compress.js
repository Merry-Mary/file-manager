import { createReadStream, createWriteStream } from 'node:fs';
import { resolve, parse } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress } from 'zlib';
import { stat } from 'node:fs/promises';

export async function compressHandler(file, destination) {
    try {
        const filePath = resolve(file);
        const fileStats = await stat(filePath);
        if (!fileStats.isFile()) {
            console.log('Please enter file');
            throw new Error();
        }
        const destinationPath = resolve(destination);
        const destinationStats = await stat(destinationPath);
        if (!destinationStats.isDirectory()) {
            console.log('Please enter directory');
            throw new Error();
        }

        const archName = `${parse(filePath).base}.br`;
        const readable = createReadStream(filePath);
        const archPath = resolve(destination, archName);
        const writable = createWriteStream(archPath);
        await pipeline(readable, createBrotliCompress(), writable);
        console.log('File compressed');
    }
    catch(error) {
        console.log('Operation failed: ', error);
    }
}