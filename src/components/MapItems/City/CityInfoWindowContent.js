import React from "react";
import {flagStyle} from "./CityItemStyle";
import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";

function CityInfoWindowContent({city}) {
  return (
      <CardHeader>
        <span>
          <img src={`img/flags/${city.country}.svg`} style={flagStyle}></img>
        </span>
        <span>
          <label className="text-left text-darker"><b>{city.name}</b></label>
        </span>
        <h4 className="text-dark float-right" ><strong>{city.points}</strong></h4>
      </CardHeader>
  );
};

export default CityInfoWindowContent;
