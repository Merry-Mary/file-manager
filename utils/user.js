import { getCLIArgs } from "./cli.js";

export const getUserName = () => {
    return getCLIArgs()['--username'] || 'stranger';
}
