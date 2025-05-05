import { parse, resolve } from 'path';
import { rename } from 'fs/promises';

export async function rnHandler(file, newName) {
    const pathFile = resolve(file);
    const { dir } = parse(pathFile);
    const newFileName = `${dir}/${newName}`;
    await rename(pathFile, newFileName);
}