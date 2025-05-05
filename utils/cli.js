import process from "node:process";

export const getCLIArgs = () => {
    return process.argv.slice(2).reduce((acc, value) => {
        const argument = value.split('=');
        return {
            ...acc,
            [argument[0].toLowerCase()]: argument[1]
        };
    }, {});
}

export const getEnteredCommand = (line) => {
    const printedCommand = line.split(' ');
    return {
        operation: printedCommand[0],
        parameters: printedCommand.slice(1)
    };
}
