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
import React from "react";
import GoogleMapReact from 'google-map-react';

function Map() {
  const defaultProps = {
    center: {
      lat: -34.6080513,
      lng: -58.3703111
    },
    zoom: 8
  };

  return (
    <>
      <div className="content" style={{backgroundColor: 'orange', height: '500px'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          options={{controlSize: 20, fullscreenControl: false, mapTypeControl: true, mapTypeControlOptions: {position: 3}}}
        >
          <label style={{position: 'fixed', top: -246, left: '-49.5%', color: 'black', backgroundColor: 'rgba(255, 255, 255, 0.6)'}}>[WIP Coordenadas]</label>
          <img src="img/circle.png" style={{position: 'fixed', top: -8, left: -8}}/>
        </GoogleMapReact>
      </div>
    </>
  );
}

export default Map;
