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
import usersService from '../services/users.service';
import * as _ from 'lodash';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Table,
  Breadcrumb,
  BreadcrumbItem, Button, ButtonGroup
} from "reactstrap";
import NotificationAlert from "react-notification-alert";
import State from "../components/State/State";
import classNames from "classnames";
import {Link} from "react-router-dom";
import DeleteCustomerButton from "../components/DeleteCustomerButton/DeleteCustomerButton";

const PENDING_STATE = 'pending';
const ACTIVE_STATE = 'active';

const getState = (roles) => {
  return _.reduce(roles, (state, role) => {
    if (role === 'CUSTOMER') return ACTIVE_STATE;
    if (role === 'CUSTOMER_UNAUTHENTICATED') return PENDING_STATE;
    else return state;
  }, PENDING_STATE);
}

const Customers = () => {
  const notificationAlertRef = React.useRef(null);
  const [customers, setCustomers] = useState([]);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState();

  useEffect(() => {
    findCustomers();
  }, []);

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

  const findCustomers = () => {
    usersService.customers().then(setCustomers);
  }

  const deleteHandler = () => {
    findCustomers();
    showSuccessAlert('El usuario se borró correctamente 😃')
  }

  const errorHandler = () => {
    showErrorAlert('Ops! 😅 Algo salió mal, volvé a intentarlo cuando alguien lo arregle!');
  }

  const filterByPendingState = (customer) => filter !== PENDING_STATE || getState(customer.roles) === PENDING_STATE;
  const filterByActiveState = (customer) => filter !== ACTIVE_STATE || getState(customer.roles) === ACTIVE_STATE;
  const filterByText = (customer) => {
    console.log(search);
    return customer.username.match(search)
    || (customer.profile?.firstName && customer.profile?.firstName.match(search))
    || (customer.profile?.lastName && customer.profile?.lastName.match(search))
    || (customer.profile?.dni && customer.profile?.dni.match(search));
  }

  const FILTERS = [
    filterByPendingState,
    filterByActiveState,
    filterByText,
  ]

  const applyFilters = (customer) => {
    if (!isFilterOpen) return true;
    else return _.every(FILTERS, (f) => f(customer));
  }

  const customersList = _.chain(customers).filter(applyFilters).map(customer => (<tr key={customer._id}>
        <td><Link to={`/admin/customers/${customer.username}`}>{customer.username}</Link></td>
        <td>{`${customer.profile?.firstName || ''} ${customer.profile?.lastName || ''}`}</td>
        <td>{customer.profile?.dni}</td>
        <td><State state={getState(customer.roles)}></State></td>
        <td>{customer.wallet?.available}</td>
        <td>{customer.wallet?.reserved}</td>
        <td>{getState(customer.roles) === PENDING_STATE ? <DeleteCustomerButton customer={customer} successHandler={deleteHandler} errorHandler={errorHandler}/> : ''}</td>
  </tr>)).value();
  return (
      <>
        <div className="content">
          <div className="react-notification-alert-container">
            <NotificationAlert ref={notificationAlertRef} />
          </div>
          <Breadcrumb>
            <BreadcrumbItem active>Clientes</BreadcrumbItem>
          </Breadcrumb>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Row>
                    <Col md="2">
                      <h5 className="title">Clientes</h5>
                    </Col>
                    <Col md="10">
                      <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons" style={{marginLeft: 10}}>
                        <Button className={classNames("btn-icon", {active: isFilterOpen})} id="0" size="sm"
                            onClick={() => {setFilterOpen(!isFilterOpen)}}>
                          <i className="zmdi zmdi-filter-list" />
                        </Button>
                      </ButtonGroup>
                      {isFilterOpen ? (<Row>
                        <Col md="6">
                          <input className="form-control" placeholder="Buscar..." type="text"
                                 onChange={(e) => setSearch(e.target.value)}/>
                        </Col>
                        <Col md="6">
                          <ButtonGroup
                              className="btn-group-toggle float-right"
                              data-toggle="buttons"
                          >
                            <Button
                                tag="label"
                                className={classNames("btn-simple", {
                                  active: filter === undefined,
                                })}
                                color="info"
                                id="0"
                                size="sm"
                                onClick={() => setFilter(undefined)}
                            >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Todos
                        </span>
                              <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                            </Button>
                            <Button
                                color="info"
                                id="1"
                                size="sm"
                                tag="label"
                                className={classNames("btn-simple", {
                                  active: filter === PENDING_STATE,
                                })}
                                onClick={() => setFilter(PENDING_STATE)}
                            >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Solo Pendientes
                        </span>
                              <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                            </Button>
                            <Button
                                color="info"
                                id="1"
                                size="sm"
                                tag="label"
                                className={classNames("btn-simple", {
                                  active: filter === ACTIVE_STATE,
                                })}
                                onClick={() => setFilter(ACTIVE_STATE)}
                            >
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Solo Activos
                          </span>
                              <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
                          </span>
                            </Button>
                          </ButtonGroup>
                        </Col>
                      </Row>) : ''}
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="all-icons">
                  <Row>
                    <Col className="col-12">
                      <Table className="tablesorter" responsive>
                        <thead className="text-primary">
                        <tr>
                          <th rowSpan="2">Usuario</th>
                          <th rowSpan="2">Nombre</th>
                          <th rowSpan="2">DNI</th>
                          <th rowSpan="2">Estado</th>
                          <th colSpan="2" style={{textAlign: 'center'}}>Billetera</th>
                          <th rowSpan="2">Acción</th>
                        </tr>
                        <tr>
                          <th>Disponible</th>
                          <th>Reservado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {customersList}
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

export default Customers;
