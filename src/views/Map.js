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
      lat: -34.59835602,
      lng: -58.91502627
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
          options={{rotateControl: true, controlSize: 16, fullscreenControl: false}}
        >
          <label style={{position: 'fixed', top: -242, left: '-48%', color: 'black'}}>[WIP Coordenadas]</label>
          <img src="img/circle.png"/>
        </GoogleMapReact>
      </div>
    </>
  );
}

export default Map;
