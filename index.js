import { homedir } from 'node:os';
import { chdir, exit } from 'node:process';
import { getUserName } from "./utils/user.js";
import { getEnteredCommand } from "./utils/cli.js";
import { createInterface } from 'node:readline';
import { commandHandlers } from "./commands-handlers/common.js";
import { getCurrentDirectory } from "./utils/directories.js";

chdir(homedir());

const username = getUserName();

console.log(`Welcome to the File Manager, ${username }!`);

getCurrentDirectory();

console.log('Enter a command');

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl
    .on('line', async (line) => {
        const command = getEnteredCommand(line.trim());

        if (command.operation.toLowerCase().includes('.exit')) {
            rl.close();
            return;
        }

        const handler = commandHandlers[command.operation];

        try {
            if (handler) {
                await handler(command.parameters);
                console.log('\nEnter a command');
            } else {
                console.log('Invalid input. Command not exist');
            }
        } catch (error) {
            console.error('Operation failed:', error.message || error);
        }

        getCurrentDirectory();
    })
    .on('SIGINT', () => rl.close())
    .on('close', () => {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        exit();
    });


