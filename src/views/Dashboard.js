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
import React, { useEffect, useState } from "react";
import creditsService from '../services/credits.service';
import moneyService from '../services/money.service';

// reactstrap components
import {
  Row,
  Col, Card, CardBody,
} from "reactstrap";

import DashboardNumberCard from "../components/DashboardNumberCard/DashboardNumberCard";
import Credits from "../components/Credits/Credits";
import CreditQuoteWidget from "../components/CreditQuoteWidget/CreditQuoteWidget";
import FeeWidget from "../components/FeeWidget/FeeWidget";

function Dashboard() {
  const [creditsSummary, setCreditsSummary] = useState({});
  const [moneySummary, setMoneySummary] = useState({});

  useEffect(() => creditsService.summary().then(setCreditsSummary), []);
  useEffect(() => moneyService.summary().then(setMoneySummary), []);

  const availableCreditsComponent = <Credits credits={creditsSummary.available} defaultPrefix={true}></Credits>
  const reservedCreditsComponent = <Credits credits={creditsSummary.reserved} defaultPrefix={true}></Credits>
  const availableMoneyComponent = <Credits credits={moneySummary.available} prefix="$"></Credits>
  const reservedMoneyComponent = <Credits credits={moneySummary.reserved} prefix="$"></Credits>

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3">
            <DashboardNumberCard iconClass="icon-success" icon="icon-coins" title="Total Creditos Disponibles" value={availableCreditsComponent}></DashboardNumberCard>
          </Col>
          <Col lg="3">
            <DashboardNumberCard iconClass="icon-warning" icon="icon-coins" title="Total Creditos Reservados" value={reservedCreditsComponent}></DashboardNumberCard>
          </Col>
          <Col lg="3">
            <DashboardNumberCard iconClass="icon-success" icon="icon-money-coins" title="Total Dinero Disponible" value={availableMoneyComponent}></DashboardNumberCard>
          </Col>
          <Col lg="3">
            <DashboardNumberCard iconClass="icon-warning" icon="icon-money-coins" title="Total Dinero Reservado" value={reservedMoneyComponent}></DashboardNumberCard>
          </Col>
          <Col lg="3">
            <CreditQuoteWidget />
          </Col>
          <Col lg="3">
            <FeeWidget />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
