/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect} from "react";
import GoogleMapReact from 'google-map-react';
import {useGlobalState, setGlobalState, MAP_CENTER, CURRENT_COUNTRY, MAP_ITEMS} from "../contexts/GlobalState";

import * as _ from 'lodash';
import CountryItem from "./MapItems/Country/CountryItem";
import mapContext from '../contexts/Map.context';
import CityItem from "./MapItems/City/CityItem";

function Map() {
  const [center] = useGlobalState(MAP_CENTER);
  const [mapItems] = useGlobalState(MAP_ITEMS);
  const [currentCountry] = useGlobalState(CURRENT_COUNTRY);
  const defaultProps = {
    center: center,
    zoom: 8,
  };

  const mapOptions = {
    controlSize: 20,
    fullscreenControl: false,
    mapTypeControl: true,
    mapTypeControlOptions: {position: 3}
  };

  useEffect(() => {
    if (currentCountry) setGlobalState(MAP_CENTER, () =>  currentCountry.position);
  }, [currentCountry]);

  const countryItems = _.chain(mapItems).filter(item => item.mapType === mapContext.COUNTRY_TYPE).map(country => {
    return <CountryItem country={country} lat={country.position.lat} lng={country.position.lng} />
  }).value();

  const cityItems = _.chain(mapItems).filter(item => item.mapType === mapContext.CITY_TYPE).map(city => {
    return <CityItem city={city} lat={city.position.lat} lng={city.position.lng} >{city.name}</CityItem>
  }).value();

  const onMapChange = (e) => {
    console.log("Map changed " + JSON.stringify(e));
    setGlobalState(MAP_CENTER, () => e.center);
  }

  return (
    <>
      <div className="content" style={{height: '500px'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={defaultProps.center}
          center={center}
          defaultZoom={defaultProps.zoom}
          onChange={onMapChange}
          options={mapOptions}
          onGoogleApiLoaded={({map, maps}) => {
            _.chain(mapItems).filter(item => item.mapType === mapContext.VISION_RED_TYPE)
              .each(visionItem => {
                new maps.Circle(_.assign(visionItem, {map}));
              }).value();
            }}
        >
          <label className="map-label">
            lat: {center.lat} - lng: {center.lng}</label>
          <img src="img/circle.png" style={{position: 'fixed', top: -8, left: -8}}/>
          {countryItems}
          {cityItems}
        </GoogleMapReact>
      </div>
    </>
  );
}

export default Map;
