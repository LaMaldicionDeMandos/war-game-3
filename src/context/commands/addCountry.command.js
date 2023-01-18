import {parseArgs} from "./command_utils";

const COMMAND_NAME = 'addCountry';
class AddCountryCommand {
  execute(args) {
    const params = parseArgs(args);
    console.log(`Executing addCountry command with args: ${JSON.stringify(params)}`);
    return Promise.resolve(`Executing addCountry command with args: ${params}`);
  }

  support(commandName) {
    return COMMAND_NAME === commandName;
  }
}

const command = new AddCountryCommand();
export default command;
