import {parseArgs} from './command_utils';
import { assign } from 'lodash';
import countryService from '../../services/country.service';
import mapContext from '../../contexts/Map.context';

const COMMAND_NAME = 'addCity';
class AddCityCommand {
  execute(args, position) {
    const params = assign(parseArgs(args), {position});
    if (!this.#validateArgs(params)) return Promise.reject("Required arguments: (name, points and country)");
    console.log('Add City ' + JSON.stringify(params))
    return countryService.addCity(params)
      .then(city => mapContext.addItem(assign(city, {mapType: mapContext.CITY_TYPE})));
  }

  support(commandName) {
    return COMMAND_NAME === commandName;
  }

  #validateArgs = (args) => {
    return args.name && args.points && args.country;
  };
}

const command = new AddCityCommand();
export default command;
