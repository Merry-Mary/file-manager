export function cdHandler(parameters) {
    if (parameters?.length) {
        process.chdir(parameters);
    } else {
        throw Error('Path not set');
    }
}
