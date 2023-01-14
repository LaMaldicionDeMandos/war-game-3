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
import { useHistory } from "react-router-dom";
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
  Form, FormGroup
} from "reactstrap";
import {Link, useParams} from "react-router-dom";
import FormLabelRow from "../components/FormLabelRow/FormLabelRow";
import * as _ from "lodash";
import DeleteCustomerButton from "../components/DeleteCustomerButton/DeleteCustomerButton";
import DashboardNumberCard from "../components/DashboardNumberCard/DashboardNumberCard";
import BigButton from "../components/BigButton/BigButton";

function Customer() {
  const notificationAlertRef = React.useRef(null);
  const [customer, setCustomer] = useState({});
  const { username } = useParams();

  const history = useHistory();

  useEffect(() => {
    findCustomer();
  }, []);

  const findCustomer = () => {
    userService.customer(username).then(setCustomer);
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

  const deleteHandler = () => {
    showSuccessAlert('El usuario se borró correctamente 😃');
    //TODO go to previous
  }

  const PENDING_STATE = 'pending';
  const ACTIVE_STATE = 'active';

  const getState = (roles) => {
    return _.reduce(roles, (state, role) => {
      if (role === 'CUSTOMER') return ACTIVE_STATE;
      if (role === 'CUSTOMER_UNAUTHENTICATED') return PENDING_STATE;
      else return state;
    }, PENDING_STATE);
  }

  return (
    <>
      <div className="content">
        <div className="react-notification-alert-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
        <Row>
          <Col md="12">
            <Breadcrumb>
              <BreadcrumbItem><Link to={'/admin/customers'}>Clientes</Link></BreadcrumbItem>
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
                    <h5 className="title">Ficha del Cliente</h5>
                  </Col>
                  <Col md="9">
                    { getState(customer.roles) === PENDING_STATE ?
                      <DeleteCustomerButton customer={customer} className="float-right"
                                          successHandler={deleteHandler}
                                          errorHandlers={() => showErrorAlert('Ops! 😅 Algo salió mal, volvé a intentarlo cuando alguien lo arregle! ')}
                                          /> : ''}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="all-icons">
                <Row>
                  <Col lg="4">
                    <DashboardNumberCard iconClass="icon-success" icon="icon-coins" title="Creditos Disponibles" value={customer?.wallet?.available}></DashboardNumberCard>
                  </Col>
                  <Col lg="4">
                    <DashboardNumberCard iconClass="icon-warning" icon="icon-coins" title="Creditos Reservados" value={customer?.wallet?.reserved}></DashboardNumberCard>
                  </Col>
                  <Col lg="2">
                    <BigButton iconClass="tim-icons icon-paper" label="Desglosar" handler={() => history.push(`/admin/customers/${username}/wallet`)} />
                  </Col>
                </Row>
                <Form>
                  <FormLabelRow>Datos de Usuario</FormLabelRow>
                  <Row>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Username</label>
                        <input className="form-control" value={customer.username} disabled={true}/>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Nombre</label>
                        <input className="form-control" placeholder="Incompleto" value={customer.profile?.firstName} disabled={true}/>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Apellido</label>
                        <input className="form-control" placeholder="Incompleto" value={customer.profile?.lastName} disabled={true}/>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="2">
                      <FormGroup>
                        <label>DNI</label>
                        <input className="form-control" placeholder="Incompleto" value={customer.profile?.dni} disabled={true}/>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="8">
                      <FormGroup>
                        <label>Dirección</label>
                        <input className="form-control" placeholder="Incompleto" value={customer.profile?.address?.address} disabled={true}/>
                      </FormGroup>
                    </Col>
                    <Col md="12"><hr/></Col>
                  </Row>
                  <FormLabelRow>Contacto</FormLabelRow>
                  <Row>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Whatsapp</label>
                        <input className="form-control" placeholder="Incompleto" value={customer.profile?.whatsapp} disabled={true}/>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Teléfono</label>
                        <input className="form-control" placeholder="Incompleto" value={customer.profile?.phone} disabled={true}/>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Email</label>
                        <input className="form-control" placeholder="Incompleto" value={customer.profile?.email} disabled={true}/>
                      </FormGroup>
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

export default Customer;
