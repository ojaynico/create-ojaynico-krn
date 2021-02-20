import arg from 'arg';
import {createProject} from "./main";

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {

        },
        {
            argv: rawArgs.slice(2),
        }
    );

    return {
        name: args._[0],
    };
}

async function promptForMissingOptions(options) {
    const defaultName = 'MyApp';

    return {
      ...options,
      name: options.name || defaultName
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    await createProject(options);
}
