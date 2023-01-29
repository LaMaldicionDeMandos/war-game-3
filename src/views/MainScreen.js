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

// reactstrap components
import { Card, CardBody, Row, Col } from "reactstrap";
import Map from "../components/Map";
import Console from "../components/Console";

import worldService from '../services/world.service';

function MainScreen() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    worldService.getAllCountries()
      .then(c => setCountries(c));
  }, []);

  return (
    <>
      <div className="content">
        <Row style={{backgroundColor: 'red'}}>
          <Col md="12" style={{padding: 0}}>
            <Card className="card-plain" style={{margin: 0}}>
              <CardBody style={{padding: 0}}>
                <Map countries={countries}/>
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
