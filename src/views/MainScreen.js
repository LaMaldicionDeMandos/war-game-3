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
import React, {useEffect, useState} from "react";
import * as _ from 'lodash';

// reactstrap components
import { Card, CardBody, Row, Col } from "reactstrap";
import Map from "../components/Map";
import Console from "../components/Console";

import {useGlobalState, CURRENT_EVENT, CURRENT_COUNTRY, setGlobalState} from "../contexts/GlobalState";

import mapContext from '../contexts/Map.context';
import worldService from '../services/world.service';
import countryService from '../services/country.service';

function MainScreen() {
  const [currentEvent] = useGlobalState(CURRENT_EVENT);
  const [currentCountry] = useGlobalState(CURRENT_COUNTRY);

  useEffect(() => {
    console.log('GET COUNTRIES');
    worldService.getAllCountries()
      .then(countries => {
        mapContext.addItems(_.map(countries, country => _.assign(country, {mapType: mapContext.COUNTRY_TYPE})));
      });
    worldService.getAllCities()
      .then(cities => {
        mapContext.addItems(_.map(cities, city => _.assign(city, {mapType: mapContext.CITY_TYPE})))
      })
  }, []);

  useEffect(() => {
    if( currentEvent) getCurrentCountry(currentEvent.countryId);
  }, [currentEvent]);

  const getCurrentCountry = (id) => {
    countryService.getCountry(id)
      .then(country => {
        setGlobalState(CURRENT_COUNTRY, () => country);
      })
      .catch(e => {
        console.error(JSON.stringify(e));
      });
  }

  return (
    <>
      <div className="content">
        <Row style={{backgroundColor: 'red'}}>
          <Col md="12" style={{padding: 0}}>
            <Card className="card-plain" style={{margin: 0}}>
              <CardBody style={{padding: 0}}>
                <Map />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row style={{backgroundColor: 'lightgrey', height: '220px'}}>
          <Col md="12">
            <Card className="card-plain">
              <CardBody>
                [WIP Graficos]
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row style={{backgroundColor: 'darkgrey', height: '40px'}}>
          <Col md="12" style={{padding: 0}}>
            <Console />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default MainScreen;
