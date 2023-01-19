import {parseArgs} from './command_utils';
import { assign } from 'lodash'
import worldService from '../../services/world.service';

const COMMAND_NAME = 'addCountry';
class AddCountryCommand {
  execute(args, position) {
    const params = assign(parseArgs(args), {position});
    if (!this.#validateArgs(params)) return Promise.reject("Required arguments: (name, code, pib and pop)");
    return worldService.addCountry(params);
  }

  support(commandName) {
    return COMMAND_NAME === commandName;
  }

  #validateArgs = (args) => {
    return args.code && args.name && args.pib && args.pop;
  };
}

const command = new AddCountryCommand();
export default command;
