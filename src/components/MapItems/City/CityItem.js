import React from "react";

import {cityItemStyle, buildingStyle, flagStyle} from "./CityItemStyle";

function CityItem({city}) {

  return (
    <div style={cityItemStyle}>
      <img src="img/items/city_y.png" style={buildingStyle}></img>
      <img src={`img/flags/${city.country}.svg`} style={flagStyle}></img>
    </div>
  );
}

export default CityItem;
