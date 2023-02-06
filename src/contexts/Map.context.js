import {MAP_ITEMS, setGlobalState} from "../contexts/GlobalState";
import * as _ from 'lodash';

class MapContext {
  COUNTRY_TYPE = 'country';
  VISION_RED_TYPE = 'vision_red';
  #items = [/*{
    mapType: this.VISION_RED_TYPE,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.3,
    center: {lat: -34.606, lng: -58.411},
    radius: 1000000},
    {
      mapType: this.VISION_RED_TYPE,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.3,
      center: {lat: -34.206, lng: -58.411},
      radius: 10000}*/];
  constructor() {
    this.#setItems();
  }

  clear() {
    this.#items = [];
    this.#setItems();
  }

  addItems(items) {
    this.#items = _.concat(this.#items, items);
    this.#setItems();
  }

  #setItems() {
    setGlobalState(MAP_ITEMS, () => this.#items);
  }
}

const context = new MapContext();
export default context;
