import { readdir } from "fs/promises";

export async function lsHandler() {
    const directoryContent = await readdir(process.cwd(), { withFileTypes: true});
    const directories = [];
    const files = [];
    const others = [];

    directoryContent.forEach(item => {
        if (item.isDirectory()) {
            directories.push([item.name, 'directory']);
        } else if (item.isFile()) {
            files.push([item.name, 'file']);
        } else if (item.isSymbolicLink()) {
            others.push([item.name, 'symbolic link']);
        } else {
            others.push([item.name]);
        }
    });

    const result = [
        ...directories.sort(),
        ...files.sort(),
        ...others.sort()
    ];

    console.table(result);
}
