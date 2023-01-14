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
import userService from '../services/users.service';
import NotificationAlert from "react-notification-alert";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  BreadcrumbItem,
  Breadcrumb,
  Form, FormGroup, ListGroup, ListGroupItem
} from "reactstrap";
import {Link, useParams} from "react-router-dom";
import FormLabelRow from "../components/FormLabelRow/FormLabelRow";
import CollapsePanel from "../components/CollapsePanel/CollapsePanel";
import ActionProviderButton from "../components/ActionProviderButton/ActionProviderButton";

function Provider() {
  const notificationAlertRef = React.useRef(null);
  const [provider, setProvider] = useState({});
  const { username } = useParams();

  useEffect(() => {
    findProvider();
  }, []);

  const findProvider = () => {
    userService.provider(username).then(setProvider);
  }

  const createListItem = (w) => <ListGroupItem key={w}><label>{w}</label></ListGroupItem>;

  const whatsapps = _.map(provider.profile?.info?.contact?.whatsapps, createListItem);
  const emails = _.map(provider.profile?.info?.contact?.emails, createListItem);
  const phones = _.map(provider.profile?.info?.contact?.phones, createListItem);
  const addresses = _.chain(provider.profile?.info?.addresses)
      .map(addr => addr.address)
      .map(createListItem).value();

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

  const deleteHandler = () => {
    showSuccessAlert('El usuario se borró correctamente 😃');
    //TODO go to previous
  }

  const activeHandler = () => {
    findProvider();
    showSuccessAlert('El usuario se activó correctamente 😃');
  }

  const enrollmentsViews = _.map(provider.profile?.info?.legal?.enrollments, (en) => {
    return (<Row key={`enrollment${en.enrollment}${en.type}`}>
      <Col md="8">
        <FormGroup>
          <input className="form-control" placeholder="Incompleto" value={en.enrollment} disabled={true}/>
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <input className="form-control" placeholder="Incompleto" value={en.type} disabled={true}/>
        </FormGroup>
      </Col>
    </Row>)
  })

  return (
    <>
      <div className="content">
        <div className="react-notification-alert-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
        <Row>
          <Col md="12">
            <Breadcrumb>
              <BreadcrumbItem><Link to={'/admin/providers'}>Prestadores</Link></BreadcrumbItem>
              <BreadcrumbItem active>{username}</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="3">
                    <h5 className="title">Ficha del prestador</h5>
                  </Col>
                  <Col md="9">
                    <ActionProviderButton provider={provider} className="float-right"
                                          successHandlers={{activeHandler: activeHandler, deleteHandler: deleteHandler}}
                                          errorHandlers={{
                                            defaultHandler: () => showErrorAlert('Ops! 😅 Algo salió mal, volvé a intentarlo cuando alguien lo arregle! '),
                                            activeHandler: (e) => {
                                              if(e === 'invalid_cbu') {
                                                showErrorAlert('Ops! 😅 Algo salió mal, verificá que el prestador tenga un CBU/CVU o alias validos.');
                                              } else showErrorAlert('Ops! 😅 Algo salió mal, volvé a intentarlo cuando alguien lo arregle! ')
                                            }
                                          }}
                                          />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="all-icons">
                <Form>
                  <FormLabelRow>Datos de Usuario</FormLabelRow>
                  <Row>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Username</label>
                        <input className="form-control" value={provider.username} disabled={true}/>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Nombre</label>
                        <input className="form-control" placeholder="Incompleto" value={provider.profile?.firstName} disabled={true}/>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Apellido</label>
                        <input className="form-control" placeholder="Incompleto" value={provider.profile?.lastName} disabled={true}/>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="2">
                      <FormGroup>
                        <label>DNI</label>
                        <input className="form-control" placeholder="Incompleto" value={provider.profile?.dni} disabled={true}/>
                      </FormGroup>
                    </Col>
                    <Col md="12"><hr/></Col>
                  </Row>
                  <FormLabelRow>Personalidad Jurídica</FormLabelRow>
                  <Row>
                    <Col className="pr-md-1" md="2">
                      <FormGroup>
                        <label>Tipo de Personalidad Jurídica</label>
                        <input className="form-control" placeholder="Incompleto" value={provider.profile?.info?.legal?.type} disabled={true}/>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="2">
                      <FormGroup>
                        <label>CUIT</label>
                        <input className="form-control" placeholder="Incompleto" value={provider.profile?.info?.legal?.cuit} disabled={true}/>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="8">
                      <FormGroup>
                        <label>Dirección</label>
                        <input className="form-control" placeholder="Incompleto" value={provider.profile?.address?.address} disabled={true}/>
                      </FormGroup>
                    </Col>
                    {provider.profile?.info?.legal?.type === 'legal' ?
                        (
                          <>
                            <Col className="px-md-1" md="4">
                              <FormGroup>
                                <label>Razón Social</label>
                                <input className="form-control" placeholder="Incompleto" value={provider.profile?.info?.legal?.businessName} disabled={true}/>
                              </FormGroup>
                            </Col>
                            <Col className="px-md-1" md="4">
                              <FormGroup>
                                <label>Nombre de fantasia</label>
                                <input className="form-control" placeholder="Incompleto" value={provider.profile?.info?.legal?.fantasyName} disabled={true}/>
                              </FormGroup>
                            </Col>
                          </>
                        ) :
                        (
                            <>
                              <Col md="4">
                                <Row>
                                  <Col md="8">
                                    <FormGroup>
                                      <label>Matricula</label>
                                      <input className="form-control" placeholder="Incompleto" value={provider.profile?.info?.legal?.enrollment} disabled={true}/>
                                    </FormGroup>
                                  </Col>
                                  <Col md="4">
                                    <FormGroup>
                                      <label>Tipo</label>
                                      <input className="form-control" placeholder="Incompleto" value={provider.profile?.info?.legal?.enrollmentType} disabled={true}/>
                                    </FormGroup>
                                    </Col>
                                  </Row>
                                {provider.profile?.info?.legal?.enrollments
                                  ? enrollmentsViews
                                  : ''}
                              </Col>
                              <Col className="px-md-1" md="4">
                                <FormGroup>
                                  <label>Prefijo</label>
                                  <input className="form-control" placeholder="Incompleto" value={provider.profile?.info?.legal?.prefix} disabled={true}/>
                                </FormGroup>
                              </Col>
                            </>
                        )}
                    <Col md="12"><hr/></Col>
                  </Row>
                  <FormLabelRow>Cuenta Bancaria</FormLabelRow>
                  <Row>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>CBU/CVU</label>
                        <input className="form-control" placeholder="Incompleto" value={provider.profile?.paymentAccount?.cbu} disabled={true}/>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="2">
                      <FormGroup>
                        <label>ALIAS</label>
                        <input className="form-control" placeholder="Incompleto" value={provider.profile?.paymentAccount?.alias} disabled={true}/>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Banco</label>
                        <input className="form-control" placeholder="Incompleto" value={provider.profile?.paymentAccount?.bankName} disabled={true}/>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Titular</label>
                        <input className="form-control" placeholder="Incompleto" value={provider.profile?.paymentAccount?.owner} disabled={true}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormLabelRow>Contacto</FormLabelRow>
                  <Row>
                    <Col className="pr-md-1 card-body" md="4">
                      <CollapsePanel header={
                        (<>
                              <div className="icon-whatsapp-little info-icon-little text-center" style={{display: 'inline-block'}}>
                                <i className="zmdi zmdi-whatsapp"></i>
                              </div>
                              <h5 style={{marginTop: 5, marginBottom: 5, marginLeft:10, display: 'inline-block', fontWeight: 'bold'}}>Watshapp</h5>
                        </>
                        )
                      }>
                        <ListGroup>
                          {whatsapps}
                        </ListGroup>
                      </CollapsePanel>
                    </Col>
                    <Col className="pr-md-1 card-body" md="4">
                      <CollapsePanel header={
                        (<>
                              <div className="icon-email-little info-icon-little text-center" style={{display: 'inline-block'}}>
                                <i className="zmdi zmdi-email"></i>
                              </div>
                              <h5 style={{marginTop: 5, marginBottom: 5, marginLeft:10, display: 'inline-block', fontWeight: 'bold'}}>Emails</h5>
                            </>
                        )
                      }>
                        <ListGroup>
                          {emails}
                        </ListGroup>
                      </CollapsePanel>
                    </Col>
                    <Col className="pr-md-1 card-body" md="4">
                      <CollapsePanel header={
                        (<>
                              <div className="icon-phone-little info-icon-little text-center" style={{display: 'inline-block'}}>
                                <i className="zmdi zmdi-phone"></i>
                              </div>
                              <h5 style={{marginTop: 5, marginBottom: 5, marginLeft:10, display: 'inline-block', fontWeight: 'bold'}}>Teléfonos</h5>
                            </>
                        )
                      }>
                        <ListGroup>
                          {phones}
                        </ListGroup>
                      </CollapsePanel>
                    </Col>
                    <Col className="pr-md-1 card-body" md="12">
                      <CollapsePanel header={
                        <h5 style={{marginTop: 5, marginBottom: 5, marginLeft:10, display: 'inline-block', fontWeight: 'bold'}}>Direcciones</h5>
                      }>
                        <ListGroup>
                          {addresses}
                        </ListGroup>
                      </CollapsePanel>
                    </Col>
                    <Col md="12"><hr/></Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Provider;
