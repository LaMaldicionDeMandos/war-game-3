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
import invoiceService from '../services/invoice.service';
import {Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Col, Row, Table} from "reactstrap";
import * as _ from "lodash";
import {Link} from "react-router-dom";
import NumberFormat from "react-number-format";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    findInvoices();
  }, []);

  const findInvoices = () => {
    invoiceService.getPendingInvoices().then(setInvoices);
  }

  const invoiceItems = _.map(invoices, invoice => (<tr key={invoice.invoice}>
    <td>{invoice.username}</td>
    <td><Link to={`/admin/invoices/${invoice.invoice}`}>{invoice.invoice}</Link></td>
    <td><NumberFormat value={invoice.total}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="$"
                      decimalScale={2}
                      fixedDecimalScale={true}
                      displayType="text"/></td>
  </tr>));

  return (
    <div className="content">
      <Breadcrumb>
        <BreadcrumbItem active>Facturas pendientes</BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <Row>
                <Col md="12">
                  <h5 className="title">Facturas Pendientes</h5>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="all-icons">
              <Row>
                <Col className="col-12">
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                    <tr>
                      <th>Prestador</th>
                      <th>Factura</th>
                      <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                      {invoiceItems}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Invoices;
