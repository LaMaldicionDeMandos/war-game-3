import {createGlobalState} from "react-hooks-global-state";

const initialState = {
  mapCenter: { lat: 0, lng: 0 }
}

const { setGlobalState, useGlobalState } = createGlobalState(initialState);

export { useGlobalState, setGlobalState };

export const MAP_CENTER = 'mapCenter';
