import {createGlobalState} from "react-hooks-global-state";

const initialState = {
  mapCenter: { lat: 0, lng: 0 },
  currentDate: '1900-01-01 00:00:00',
  currentEvent: undefined,
  currentCountry: undefined
}

const { setGlobalState, useGlobalState } = createGlobalState(initialState);

export { useGlobalState, setGlobalState };

export const MAP_CENTER = 'mapCenter';
export const CURRENT_DATE = 'currentDate';
export const CURRENT_EVENT = 'currentEvent';
export const CURRENT_COUNTRY = 'currentCountry';
