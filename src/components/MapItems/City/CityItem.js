import React, {useState} from "react";

import {cityItemStyle, buildingStyle, flagStyle} from "./CityItemStyle";
import InfoWindow from "../InfoWindow/InfoWindow";
import CityInfoWindowContent from "./CityInfoWindowContent";

function CityItem({city}) {
  const [showWindow, setShowWindow] = useState(false);

  const onClick = () => setShowWindow(!showWindow);
  return (
    <div style={cityItemStyle} onClick={onClick}>
      <img src="img/items/city_y.png" style={buildingStyle}></img>
      <img src={`img/flags/${city.country}.svg`} style={flagStyle}></img>
      {showWindow ? <InfoWindow><CityInfoWindowContent city={city} /></InfoWindow> : ''}
    </div>
  );
};

export default CityItem;
