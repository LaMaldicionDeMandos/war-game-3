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
import userService from '../services/users.service';
import walletService from '../services/wallet.service';
import * as _ from 'lodash';
import { Duration } from "luxon";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  BreadcrumbItem,
  Breadcrumb, Table
} from "reactstrap";
import {Link, useParams, useHistory} from "react-router-dom";
import DashboardNumberCard from "../components/DashboardNumberCard/DashboardNumberCard";
import BigButton from "../components/BigButton/BigButton";

const DATE_FORMATTER = new Intl.DateTimeFormat('es-AR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit'})

function Wallet() {
  const [customer, setCustomer] = useState({});
  const [wallet, setWallet] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    userService.customer(username).then(setCustomer);
    walletService.walletDetails(username).then(setWallet);
  }, []);

  const history = useHistory();

  const NOW = Date.now();
  const duration = (date) => {
    const duration = Duration.fromMillis(date - NOW, {}).shiftTo('months', 'days', 'hours');
    const days = duration.as('days');
    if (days > 60) return duration.shiftTo('months').toHuman({ floor: true });
    else if (days > 2) return duration.shiftTo('days').toHuman({  floor: true });
    else return duration.shiftTo('hours').toHuman({ floor: true });
  }

  const creditsList = _.map(wallet, credits => {
        const expirationDate = Date.parse(credits.expirationDate);
        return (
            <tr key={credits._id}>
              <td>{credits.available}</td>
              <td>{credits.reserved}</td>
              <td>{DATE_FORMATTER.format(expirationDate)}</td>
              <td>{duration(expirationDate)}</td>
            </tr>
        );
      }
  );

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Breadcrumb>
              <BreadcrumbItem><Link to={'/admin/customers'}>Clientes</Link></BreadcrumbItem>
              <BreadcrumbItem><Link to={`/admin/customers/${username}`}>{username}</Link></BreadcrumbItem>
              <BreadcrumbItem active>Billetera</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <h2>{username}</h2>
        <Row>
          <Col lg="5">
            <DashboardNumberCard iconClass="icon-success" icon="icon-coins" title="Creditos Disponibles" value={customer?.wallet?.available}></DashboardNumberCard>
          </Col>
          <Col lg="5">
            <DashboardNumberCard iconClass="icon-warning" icon="icon-coins" title="Creditos Reservados" value={customer?.wallet?.reserved}></DashboardNumberCard>
          </Col>
          <Col md="2">
            <BigButton iconClass="zmdi zmdi-money-box" label="Movimientos" handler={() => history.push(`/admin/customers/${username}/wallet/operations`)} />
          </Col>
        </Row>
        <Row>
          <Col md="10">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="3">
                    <h5 className="title">Billetera</h5>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="all-icons">
                <Row>
                  <Col className="col-12">
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                      <tr>
                        <th>Disponible</th>
                        <th>Reservado</th>
                        <th>Fecha de Expiración</th>
                        <th>Tiempo para que expire</th>
                      </tr>
                      </thead>
                      <tbody>
                      {creditsList}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Wallet;
