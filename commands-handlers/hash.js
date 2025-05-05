import { createHash } from "crypto";
import { readFile } from "fs/promises";
import { resolve } from "path";

export async function hashHandler(filePath) {
    if (filePath) {
        const path = resolve(filePath);
        const fileContent = await readFile(path);
        const hash = createHash('sha256').update(fileContent).digest('hex');
        console.log(hash);
    } else {
        throw new Error('File not set');
    }
}