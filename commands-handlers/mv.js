import { createReadStream, createWriteStream } from 'node:fs';
import { unlink } from 'node:fs/promises';
import { resolve, parse } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { stat } from 'node:fs/promises';

export async function mvHandler(file, destination) {
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

        const { base } = parse(filePath);
        const readable = createReadStream(filePath);
        const newFilePath = resolve(destinationPath, base)
        const writable = createWriteStream(newFilePath);
        await pipeline(readable, writable);
        await unlink(filePath);
        console.log('File moved');
    }
    catch(error) {
        console.log('Operation failed: ', error.message);
    }
}