import {reduce} from 'lodash'

const parseArgs = (args) => {
  return reduce(args, (map, arg) => {
    const [key, value] = arg.split('=');
    map[key] = value;
    return map;
  }, {});
}

export {parseArgs};
