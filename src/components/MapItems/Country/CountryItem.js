import React from "react";

import {countryItemStyle, poleStyle, flagStyle} from "./CountryItemStyle";

function CountryItem({country}) {

  return (
    <div style={countryItemStyle}>
      <img src="img/items/center_flag.png" style={poleStyle}></img>
      <img src={`img/flags/${country.code}.svg`} style={flagStyle}></img>
    </div>
  );
}

export default CountryItem;
