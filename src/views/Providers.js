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
import ActionProviderButton from "../components/ActionProviderButton/ActionProviderButton";

const WAITING_STATE = 'waiting';
const PENDING_STATE = 'pending';
const ACTIVE_STATE = 'active';

const getState = (roles) => {
  return _.reduce(roles, (state, role) => {
    if (role === 'PROVIDER') return ACTIVE_STATE;
    if (role === 'PROVIDER_WAITING') return WAITING_STATE;
    if (role === 'PROVIDER_UNAUTHENTICATED') return PENDING_STATE;
    else return state;
  }, WAITING_STATE);
}

const Providers = () => {
  const notificationAlertRef = React.useRef(null);
  const [providers, setProviders] = useState([]);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState();

  useEffect(() => {
    findProviders();
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

  const findProviders = () => {
    usersService.providers().then(setProviders);
  }

  const deleteHandler = () => {
    findProviders();
    showSuccessAlert('El usuario se borró correctamente 😃')
  }

  const activeHandler = () => {
    findProviders();
    showSuccessAlert('El usuario se activó correctamente 😃')
  }

  const filterByWaitingState = (provider) => filter !== WAITING_STATE || getState(provider.roles) === WAITING_STATE;
  const filterByPendingState = (provider) => filter !== PENDING_STATE || getState(provider.roles) === PENDING_STATE;
  const filterByActiveState = (provider) => filter !== ACTIVE_STATE || getState(provider.roles) === ACTIVE_STATE;
  const filterByText = (provider) => {
    console.log(search);
    return provider.username.match(search)
    || (provider.profile?.firstName && provider.profile?.firstName.match(search))
    || (provider.profile?.lastName && provider.profile?.lastName.match(search))
    || (provider.profile?.info?.businessName && provider.profile?.info?.businessName.match(search))
    || (provider.profile?.dni && provider.profile?.dni.match(search));
  }

  const FILTERS = [
    filterByWaitingState,
    filterByPendingState,
    filterByActiveState,
    filterByText,
  ]

  const applyFilters = (provider) => {
    if (!isFilterOpen) return true;
    else return _.every(FILTERS, (f) => f(provider));
  }

  const providersList = _.chain(providers).filter(applyFilters).map(provider => (<tr key={provider._id}>
        <td><Link to={`/admin/providers/${provider.username}`}>{provider.username}</Link></td>
        <td>{`${provider.profile?.firstName || ''} ${provider.profile?.lastName || ''}`}</td>
        <td>{provider.profile?.info?.businessName}</td>
        <td>{provider.profile?.dni}</td>
        <td>{provider.profile?.paymentAccount?.alias || provider.profile?.paymentAccount?.cbu}</td>
        <td><State state={getState(provider.roles)}></State></td>
        <td><ActionProviderButton provider={provider}
                                  successHandlers={{
                                    activeHandler: activeHandler,
                                    deleteHandler: deleteHandler
                                  }}
                                  errorHandlers={{
                                    defaultHandler: () => showErrorAlert('Ops! 😅 Algo salió mal, volvé a intentarlo cuando alguien lo arregle! '),
                                    activeHandler: (e) => {
                                      if(e === 'invalid_cbu') {
                                        showErrorAlert('Ops! 😅 Algo salió mal, verificá que el prestador tenga un CBU/CVU o alias validos.');
                                      } else showErrorAlert('Ops! 😅 Algo salió mal, volvé a intentarlo cuando alguien lo arregle! ')
                                    }
                                  }}/>
        </td>
  </tr>)).value();
  return (
      <>
        <div className="content">
          <div className="react-notification-alert-container">
            <NotificationAlert ref={notificationAlertRef} />
          </div>
          <Breadcrumb>
            <BreadcrumbItem active>Prestadores</BreadcrumbItem>
          </Breadcrumb>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Row>
                    <Col md="2">
                      <h5 className="title">Prestadores</h5>
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
                                id="2"
                                size="sm"
                                tag="label"
                                className={classNames("btn-simple", {
                                  active: filter === WAITING_STATE,
                                })}
                                onClick={() => setFilter(WAITING_STATE)}
                            >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          En Espera
                        </span>
                              <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
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
                          <th>Usuario</th>
                          <th>Nombre</th>
                          <th>Nombre de Negocio</th>
                          <th>DNI</th>
                          <th>CBU/CVU/Alias</th>
                          <th>Estado</th>
                          <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {providersList}
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

export default Providers;
