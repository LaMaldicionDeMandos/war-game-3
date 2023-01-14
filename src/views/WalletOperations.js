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
import walletService from '../services/wallet.service';
import * as _ from 'lodash';
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';

//import 'react-widgets/styles.css';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  BreadcrumbItem,
  Breadcrumb, Table, Button, ButtonGroup, FormGroup
} from "reactstrap";
import {Link, useParams, useLocation} from "react-router-dom";
import Paging from "../components/Paging/Paging";
import WalletOperationWidget from "../components/WalletOperationWidget/WalletOperationWidget";
import classNames from "classnames";
import FormLabelRow from "../components/FormLabelRow/FormLabelRow";

const DATE_FORMATTER = new Intl.DateTimeFormat('es-AR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit'})

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function WalletOperations() {
  const [operations, setOperations] = useState([]);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [filterFrom, setFilterFrom] = useState();
  const [filterTo, setFilterTo] = useState();
  const { username } = useParams();
  const URL = `/admin/customers/${username}/wallet/operations`;
  const offset = useQuery().get('offset') || 0;

  useEffect(() => {
    getOperations(offset);
  }, []);

  const operationsList = _.map(operations.docs, op => (<tr key={op._id}>
    <td>{op.amount}</td>
    <td>{DATE_FORMATTER.format(Date.parse(op.createdAt))}</td>
    <td><WalletOperationWidget operation={op.operation} /></td>
  </tr>));

  const getOperations = (offset = 0, from, to) => {
    walletService.userOperations(username, offset, from, to).then(setOperations);
  }

  const filterFromHandler = (date) => {
    setFilterFrom(date);
    getOperations(0, date, filterTo);
  }

  const filterToHandler = (date) => {
    setFilterTo(date);
    getOperations(0, filterFrom, date);
  }

  const filterHandler = (date, handler) => {
    if (typeof date !== 'string') handler(date.format('YYYY-MM-DD'));
    else handler(undefined);

  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Breadcrumb>
              <BreadcrumbItem><Link to={'/admin/customers'}>Clientes</Link></BreadcrumbItem>
              <BreadcrumbItem><Link to={`/admin/customers/${username}`}>{username}</Link></BreadcrumbItem>
              <BreadcrumbItem><Link to={`/admin/customers/${username}/wallet`}>Billetera</Link></BreadcrumbItem>
              <BreadcrumbItem active>Movimíentos</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <h2>{username}</h2>
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="3">
                    <h5 className="title">Movimientos</h5>
                  </Col>
                  <Col md="9">
                  <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons" style={{marginLeft: 10}}>
                    <Button className={classNames("btn-icon", {active: isFilterOpen})} id="0" size="sm"
                            onClick={() => {setFilterOpen(!isFilterOpen)}}>
                      <i className="zmdi zmdi-filter-list" />
                    </Button>
                  </ButtonGroup>
                  {isFilterOpen ? (<Row>
                    <Col md="6">
                      <Datetime
                          dateFormat="DD/MM/YYYY"
                          timeFormat={false}
                          inputProps={{placeholder:"Filtrar Desde"}}
                          onChange={(date) => filterHandler(date, filterFromHandler)}
                      />
                    </Col>
                    <Col md="6">
                      <Datetime
                          dateFormat="DD/MM/YYYY"
                          timeFormat={false}
                          inputProps={{placeholder:"Filtrar Hasta"}}
                          onChange={(date) => filterHandler(date, filterToHandler)}
                      />
                    </Col>
                  </Row>) : ''}
                </Col>
                </Row>
              </CardHeader>
              <CardBody className="all-icons">
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                  <tr>
                    <th>Creditos</th>
                    <th>Fecha</th>
                    <th>Operación</th>
                  </tr>
                  </thead>
                  <tbody>
                  {operationsList}
                  </tbody>
                </Table>
                <Paging paging={operations} url={URL}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default WalletOperations;
