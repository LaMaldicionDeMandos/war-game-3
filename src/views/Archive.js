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
import React, {useState, useEffect} from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';
import userService from '../services/users.service';
import archiveService from '../services/archive.service';
import * as _ from 'lodash';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button, FormGroup, CardFooter, ButtonToggle, Table
} from "reactstrap";
import DropdownFilter from "../components/DropdownFilter/DropdownFilter";
import {Switch} from "@mui/material";
import FormLabelRow from "../components/FormLabelRow/FormLabelRow";
import ArchiveRecord from "../components/ArchiveRecord/ArchiveRecord";

const Archive = () => {
  const [filterFrom, setFilterFrom] = useState();
  const [filterTo, setFilterTo] = useState();
  const [purchasesChecked, setPurchasesChecked] = useState(true);
  const [moneyChecked, setMoneyChecked] = useState(true);
  const [walletChecked, setWalletChecked] = useState(true);
  const [practicesChecked, setPracticesChecked] = useState(true);

  const [provider, setProvider] = useState();
  const [providers, setProviders] = useState([]);

  const [customer, setCustomer] = useState();
  const [customers, setCustomers] = useState([]);

  const [records, setRecords] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    userService.providers().then(setProviders);
  }, []);

  useEffect(() => {
    userService.customers().then(setCustomers);
  }, []);

  const canShowSearchButton = () => {
    return filterFrom && filterTo;
  }

  const filterFromHandler = (date) => {
    setFilterFrom(date);
  }

  const filterToHandler = (date) => {
    setFilterTo(date);
  }

  const filterHandler = (date, handler) => {
    if (typeof date !== 'string') handler(date.format('YYYY-MM-DD'));
    else handler(undefined);
  }

  const search = async () => {
    let filter = {from: filterFrom, to: filterTo, purchases: purchasesChecked, money: moneyChecked, wallet: walletChecked, practices: practicesChecked};
    if (provider) filter = _.assign(filter, {provider: provider.username});
    if (customer) filter = _.assign(filter, {customer: customer.username});
    const r = await archiveService.archive(filter);
    setShowMore(r.length > 0);
    setRecords(r);
  }

  const addRecords = (r) => {
    setShowMore(r.length > 0 && records.length > 0);
    const c = _.concat(records, r);
    setRecords(c);
  }

  const recordViews = _.map(records, record => {
    return <ArchiveRecord key={record._id} record={record} />
  });

  const next = async () => {
    let filter = {from: filterFrom, to: filterTo, purchases: purchasesChecked, money: moneyChecked, wallet: walletChecked, practices: practicesChecked};
    const nr = await archiveService.next(filter);
    addRecords(nr);
  }

  return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Row>
                    <Col md="12">
                      <h5 className="title">Filtro de busqueda</h5>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="all-icons">
                  <Row>
                    <Col md="3">
                      <FormGroup>
                        <label>Fecha desde</label>
                        <Datetime
                            dateFormat="DD/MM/YYYY"
                            timeFormat={false}
                            inputProps={{placeholder:"Filtrar Desde"}}
                            onChange={(date) => filterHandler(date, filterFromHandler)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <label>Fecha Hasta</label>
                        <Datetime
                            dateFormat="DD/MM/YYYY"
                            timeFormat={false}
                            inputProps={{placeholder:"Filtrar Hasta"}}
                            onChange={(date) => filterHandler(date, filterToHandler)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <label>Prestador</label>
                        <DropdownFilter collection={providers} comparablePropertyName="username" placeholder="email del prestador" handler={setProvider}/>
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <label>Paciente</label>
                        <DropdownFilter collection={customers} comparablePropertyName="username" placeholder="email del paciente" handler={setCustomer}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row><FormLabelRow>Mostrar registros de:</FormLabelRow></Row>
                  <Row>
                    <Col md="2">
                      <FormGroup>
                        <label>Compra de Creditos</label><br/>
                        <Switch checked={purchasesChecked} onChange={() => setPurchasesChecked(!purchasesChecked)} color="primary"></Switch>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <label>Operaciones de Dinero</label><br/>
                        <Switch checked={moneyChecked} onChange={() => setMoneyChecked(!moneyChecked)} color="primary"></Switch>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <label>Operaciones de Billetera</label><br/>
                        <Switch checked={walletChecked} onChange={() => setWalletChecked(!walletChecked)} color="primary"></Switch>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <label>Pago de Prestaciones</label><br/>
                        <Switch checked={practicesChecked} onChange={() => setPracticesChecked(!practicesChecked)} color="primary"></Switch>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Row>
                    <Col md="4" />
                    <Col md="4">
                      { canShowSearchButton() ? (
                      <Button className="btn-fill form-control" color="primary" type="submit" onClick={search}>
                        Buscar
                      </Button>) : ''}
                    </Col>
                    <Col md="4" />
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Row>
                    <Col md="12">
                      <h5 className="title">Registros</h5>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="all-icons">
                  {_.isEmpty(recordViews) ? (<h1 className="text-center">Sin Registros para la busqueda actual</h1>):
                    (<Table>
                    <tbody>
                    {recordViews}
                    </tbody>
                    </Table>)}
                  {showMore ? (<Button className="btn-link btn btn-primary form-control" onClick={next}>
                    Mostrar más</Button>) : ''}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
  );
}

export default Archive;
