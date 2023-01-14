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
import NotificationAlert from "react-notification-alert";
import * as _ from 'lodash';
import SweetAlert from "react-bootstrap-sweetalert";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  BreadcrumbItem,
  Breadcrumb,
  Button,
  Table
} from "reactstrap";
import {Link, useLocation, useParams, useHistory} from "react-router-dom";
import userService from "../services/users.service";
import practiceService from "../services/practices.service";
import sessionService from '../services/session.service';
import BigButton from "../components/BigButton/BigButton";
import ClipboardCopy from "../components/ClipboardCopy/ClipboardCopy";
import Credits from "../components/Credits/Credits";
import Paging from '../components/Paging/Paging';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const DATE_FORMATTER = new Intl.DateTimeFormat('es-AR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit'})

function ProviderPayouts() {
  const notificationAlertRef = React.useRef(null);
  const [provider, setProvider] = useState({});
  const [payments, setPayments] = useState({});
  const [summary, setSummary] = useState();
  const [isTransactionDialogOpen, setTransactionDialogOpen] = useState(false);
  const [currentPayment, setCurrentPrayment] = useState();
  const { username } = useParams();
  const offset = useQuery().get('offset') || 0;
  const URL = `/admin/providers/${username}/payouts`;
  const history = useHistory();

  useEffect(() => {
    findProvider();
    findPayments(offset);
  }, []);

  const findProvider = () => {
    userService.provider(username).then(setProvider);
  }

  const findPayments = async (offset) => {
    const payoutsInfo = await practiceService.providerApprovedPayments(username, offset);
    if (payoutsInfo.totalPages > 1) {
      practiceService.providerApprovedPaymentsSummary(username).then((s) => setSummary(s.summaryPrice));
    } else {
      setSummary(_.reduce(payoutsInfo.docs, (sum, payout) => sum + payout.price, 0));
    }
    setPayments(payoutsInfo);
  }

  const showAlert = (message, type = 'info', icon = '', place = 'tc') => {
    const options = {
      place: place,
      message: (
            <span>
              {message}
            </span>
      ),
      type: type,
      icon: `tim-icons ${icon}`,
      autoDismiss: 3,
    };
    notificationAlertRef.current.notificationAlert(options);
  }

  const payPaymentHandler = (payment) => {
    setCurrentPrayment(payment);
    setTransactionDialogOpen(true);
  }

  const payAllHandler = () => {
    setCurrentPrayment(undefined);
    setTransactionDialogOpen(true);
  }

  const onPay = (transactionId) => {
    const promise = currentPayment
        ? onPayOne(transactionId, currentPayment._id)
        : onPayAll(transactionId);
    promise.then(() => {
          showAlert('Se registró la transferencia exitosamente!', 'success');
          //history.push(`/admin/providers/${username}`);
        })
        .catch(() => showAlert('Ops! 😅 Algo salió mal, volvé a intentarlo cuando alguien lo arregle!', 'danger', 'icon-alert-circle-exc'));
    setCurrentPrayment(undefined);
  }

  const onPayAll = (transactionId) => {
    return practiceService.payAll(username, transactionId);
  }

  const onPayOne = (transactionId, paymentId) => {
    return practiceService.pay(paymentId, transactionId);
  }

  const paymentList = _.map(payments.docs, payment => (<tr key={payment._id}>
    <td><Link to={`/admin/customers/${payment.customerUsername}`}>{payment.customerUsername}</Link></td>
    <td>{payment.practiceName}</td>
    <td>{payment.price}</td>
    <td>{DATE_FORMATTER.format(Date.parse(payment.updatedAt))}</td>
    {sessionService.isGod() ? <td><Button className="btn-fill" color="info" type="button" onClick={() => payPaymentHandler(payment)}>Pagar</Button></td> : ''}
  </tr>));

  return (
    <>
      {isTransactionDialogOpen ? <SweetAlert
          input
          showCancel
          title="Transferencia"
          confirmBtnText="Envíar"
          confirmBtnBsStyle="info"
          cancelBtnBsStyle="secondary"
          placeholder="Número de transferencia"
          validationMsg="Por favor ingresá un numero de transferencia"
          onConfirm={(transactionId) => {
            onPay(transactionId);
            setTransactionDialogOpen(false);
          }}
          onCancel={() => setTransactionDialogOpen(false)}
      >
        Ingresá el número de transferencia para registrar la operación
      </SweetAlert> : ''}
      <div className="content">
        <div className="react-notification-alert-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
        <Row>
          <Col md="12">
            <Breadcrumb>
              <BreadcrumbItem><Link to={'/admin/providers'}>Prestadores</Link></BreadcrumbItem>
              <BreadcrumbItem><Link to={`/admin/providers/${username}`}>{username}</Link></BreadcrumbItem>
              <BreadcrumbItem active>Pagos Pendientes</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="5">
                    <h5 className="title">Cuenta Bancaria</h5>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <h5>CBU/CVU/ALIAS</h5>
                <Row style={{paddingLeft: 20}}>
                  <ClipboardCopy textToCopy={provider.profile?.paymentAccount?.cbu} onCopy={() => showAlert('Copiado!') }>
                    <h3>
                      <span style={{padding: 10, paddingTop: 5, paddingRight: 0}}>{provider.profile?.paymentAccount?.cbu}</span>
                    </h3>
                  </ClipboardCopy>
                </Row>


              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="5">
                    <h5 className="title">Datos de Cuenta</h5>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row style={{paddingLeft: 20}}>
                  <h5 style={{marginRight: 10}}>Banco:</h5>
                  <label>{provider.profile?.paymentAccount?.bankName}</label>
                </Row>
                <Row style={{paddingLeft: 20}}>
                  <h5 style={{marginRight: 10}}>Alias:</h5>
                  <label>{provider.profile?.paymentAccount?.alias}</label>
                </Row>
                <Row style={{paddingLeft: 20}}>
                  <h5 style={{marginRight: 10}}>Titular:</h5>
                  <label>{provider.profile?.paymentAccount?.owner}</label>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="5">
                    <h5 className="title">Total a Pagar</h5>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row style={{paddingLeft: 20}}>
                  <Col md="6">
                    <h2 style={{marginRight: 10}}><Credits credits={summary} prefix={'$'} /></h2>
                  </Col>
                  <Col md="6">
                    <div className="float-right">
                      {sessionService.isGod() ? <BigButton label="Pagar Todo" iconClass="tim-icons icon-bank" handler={payAllHandler}/> : ''}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Pagos Pendientes</h5>
              </CardHeader>
              <CardBody className="all-icons">
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                    <tr>
                      <th>Paciente</th>
                      <th>Práctica</th>
                      <th>Precio</th>
                      <th>Fecha</th>
                    </tr>
                    </thead>
                    <tbody>
                      {paymentList}
                    </tbody>
                  </Table>
                  <Paging paging={payments} url={URL}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ProviderPayouts;
