import { createReadStream, createWriteStream } from 'node:fs';
import { resolve, parse } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createBrotliDecompress } from 'zlib';
import { stat } from 'node:fs/promises';

export async function decompressHandler(archPath, pathToDecompose) {
    try {
        const path = resolve(archPath);
        const archStats = await stat(path);
        if (!archStats.isFile()) {
            console.log('Please enter file to decompress');
            throw new Error();
        }
        const destinationPath = resolve(pathToDecompose);
        const destinationStats = await stat(destinationPath);
        if (!destinationStats.isDirectory()) {
            console.log('Please enter directory');
            throw new Error();
        }

        const fileName = parse(path).name;
        const readable = createReadStream(archPath);
        const filePath = resolve(destinationPath, fileName);
        const writable = createWriteStream(filePath);
        await pipeline(readable, createBrotliDecompress(), writable);
        console.log('File decompressed');
    }
    catch(_error) {
        console.log('Operation failed');
    }
}