import { upHandler } from "./up.js";
import { cdHandler } from "./cd.js";
import { lsHandler } from "./ls.js";
import { catHandler } from "./cat.js";
import { addHandler } from "./add.js";
import { mkdirHandler } from "./mkdir.js";
import { rnHandler } from "./rn.js";
import { cpHandler } from "./cp.js";
import { mvHandler } from "./mv.js";
import { rmHandler } from "./rm.js";
import { osHandler } from "./os.js";
import { hashHandler } from "./hash.js";
import { compressHandler } from "./compress.js";
import { decompressHandler } from "./decompress.js";

export const commandHandlers = {
    up: async () => upHandler(),
    cd: async ([path]) => cdHandler(path),
    ls: async () => await lsHandler(),
    cat: async ([path]) => await catHandler(path),
    add: async ([filename]) => await addHandler(filename),



    mkdir: async ([dirname]) => await mkdirHandler(dirname),



    rn: async ([oldName, newName]) => await rnHandler(oldName, newName),
    cp: async ([src, dest]) => await cpHandler(src, dest),
    mv: async ([src, dest]) => await mvHandler(src, dest),
    rm: async ([path]) => await rmHandler(path),
    os: async ([param]) => await osHandler(param),
    hash: async ([path]) => await hashHandler(path),
    compress: async ([src, dest]) => await compressHandler(src, dest),
    decompress: async ([src, dest]) => await decompressHandler(src, dest)
};
