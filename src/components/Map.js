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
import React, {useState} from "react";
import GoogleMapReact from 'google-map-react';

function Map() {
  const [center, setCenter] = useState({lat: 0, lng: 0});
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

  const onMapChange = (e) => {
    console.log("Map changed " + JSON.stringify(e));
    setCenter(e.center);
  }

  return (
    <>
      <div className="content" style={{height: '500px'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          onChange={onMapChange}
          options={mapOptions}
        >
          <label className="map-label">
            lat: {center.lat} - lng: {center.lng}</label>
          <img src="img/circle.png" style={{position: 'fixed', top: -8, left: -8}}/>
        </GoogleMapReact>
      </div>
    </>
  );
}

export default Map;
