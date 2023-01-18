import * as _ from 'lodash';

import addCountryCommand from '../context/commands/addCountry.command';

class Console {
  #processors = [addCountryCommand];
  execute(command) {
    const expressions = this.#toArray(command);
    const commandName = _.first(expressions);
    const args = _.tail(expressions);
    const processor = _.find(this.#processors, processor => processor.support(commandName));
    if (!processor) return Promise.reject(`Error: command ${commandName} not found`);
    return processor.execute(args);
  }

  #toArray = (command) => {
    return _.chain(command).split(' ').map((arg) => arg.trim()).value();
  }
}

const _console = new Console();
export default _console;
