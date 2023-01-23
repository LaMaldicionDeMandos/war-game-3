import * as _ from 'lodash';

import addCountryCommand from '../context/commands/addCountry.command';

class Console {
  #processors = [addCountryCommand];
  execute(command, position) {
    const [commandName, args] = this.#splitCommand(command);
    const processor = _.find(this.#processors, processor => processor.support(commandName));
    if (!processor) return Promise.reject(`Error: command ${commandName} not found`);
    return processor.execute(args, position);
  }

  #splitCommand = (command) => {
    const index = command.indexOf(' ');
    const commandName = command.substring(0, index);
    const args = command.substring(index + 1);

    return [commandName, this.#parseParams(args)];
  }

  #parseParams(args) {
    return _.chain(args).split('--').tail().map((arg) => arg.trim()).value();
  }
}

const _console = new Console();
export default _console;
