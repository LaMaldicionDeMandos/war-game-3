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
import {Link, useParams} from "react-router-dom";
import { Document, Page, pdfjs } from 'react-pdf';
import {Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardFooter, CardHeader, Col, Row, Table} from "reactstrap";
import NotificationAlert from "react-notification-alert";

import invoiceService from '../services/invoice.service';
import NumberFormat from "react-number-format";
import * as _ from "lodash";

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'standard_fonts/',
};

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Invoice = () => {
  const notificationAlertRef = React.useRef(null);
  const { invoiceName } = useParams();

  const [invoice, setInvoice] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState();

  useEffect(() => {
    findInvoice(invoiceName);
  }, []);

  const findInvoice = (invoiceName) => {
    invoiceService.getInvoice(invoiceName).then(setInvoice);
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log('Load pdf success ' + numPages);
    setNumPages(numPages);
  }

  function changePage(offset) {
    setCurrentPage(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const showAlert = (message, type = 'info', icon = '', place = 'tc') => {
    const options = {
      place: place,
      message: (
        <div>
          <div>
            {message}
          </div>
        </div>
      ),
      type: type,
      icon: `tim-icons ${icon}`,
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  }

  const showErrorAlert = (message, place = 'tc') => {
    showAlert(message, 'danger', 'icon-alert-circle-exc');
  }

  const showSuccessAlert = (message, place = 'tc') => {
    showAlert(message, 'success', 'icon-check-2');
  }

  const practiceItems = (practices, id) => _.map(practices, (p, index) => <div key={`p_${id}_${index}`}><span>{p}</span><br/></div>);

  const orders = _.map(invoice?.orders, order => (<tr key={order._id}>
    <td>{practiceItems(order.practiceNames, order._id)}</td>
    <td className="text-right"><NumberFormat value={order.price}
                                             thousandSeparator="."
                                             decimalSeparator=","
                                             prefix="$"
                                             decimalScale={2}
                                             fixedDecimalScale={true}
                                             displayType="text"/></td>
  </tr>));

  const approve = () => {
    invoiceService.approve(invoiceName).then(() => {
        showSuccessAlert('Factura aceptada! 😃');
      }).catch(() => {
        showErrorAlert('Ops hubo un error 😅');
      });
  }

  const revoke = () => {
    invoiceService.revoke(invoiceName).then(() => {
      showSuccessAlert('Factura rechazada! 😃');
    }).catch(() => {
        showErrorAlert('Ops hubo un error 😅');
    });
  }

  return (
    <div className="content">
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Breadcrumb>
        <BreadcrumbItem><Link to={'/admin/invoices'}>Facturas pendientes</Link></BreadcrumbItem>
        <BreadcrumbItem active>{invoiceName}</BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col md="6">
          {invoice ?
            (<Card>
            <CardHeader>
              <Row>
                <Col md="12">
                  <h5 className="title">Factura {invoiceName}</h5>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="all-icons">
              <Row>
                <Col className="col-12">
                  <Table className="tablesorter table-striped" responsive>
                    <thead className="text-primary">
                    <tr>
                      <th className="text-center">Detaille</th>
                      <th className="text-center">Precio</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col className="col-12">
                  <div className="text-right">
                    <label style={{marginRight: 20}}>Total</label>
                    <NumberFormat value={invoice?.total}
                                  thousandSeparator="."
                                  decimalSeparator=","
                                  prefix="$"
                                  decimalScale={2}
                                  fixedDecimalScale={true}
                                  displayType="text"/>
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <Button className="btn-fill" color="primary" type="submit" onClick={approve}>
                Confirmar
              </Button>
              <Button className="btn-fill" color="warning" type="submit" onClick={revoke}>
                Rechazar
              </Button>
            </CardFooter>
          </Card>) : ''}
        </Col>
        <Col md="6">
          {invoice ?
            (<Card>
              <CardBody className="all-icons">
                <Row>
                  <Col className="col-12">
                    <Document file={invoice.url} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                      <Page pageNumber={currentPage} />
                    </Document>
                    <div>
                      <div className="pagec">
                        Page {currentPage || (numPages ? 1 : '--')} of {numPages || '--'}
                      </div>
                      <div className="buttonc">
                        <button
                          type="button"
                          disabled={currentPage <= 1}
                          onClick={previousPage}
                          className="Pre"

                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          disabled={currentPage >= numPages}
                          onClick={nextPage}

                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>) : ''}
        </Col>
      </Row>
    </div>
  );
}

export default Invoice;
