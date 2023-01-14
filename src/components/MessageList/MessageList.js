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

import messagesService from '../../services/messages.service';

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Table, Button, ButtonGroup
} from "reactstrap";
import classNames from "classnames";

const ALL = 'all';
const ANY = 'any';
const EMAIL = 'email';
const APP = 'app';
const CUSTOMER = 'customer_only';
const PROVIDER = 'provider_only';

const DESTINATIONS = {
    any: 'Todos',
    email: 'Email',
    app: 'App'
}

const ROLES = {
    any: 'Todos',
    customer_only: 'Solo Prestadores',
    provider_only: 'Solo Pacientes'
}

const ONLY_SHOW = 5;

const MessageList = ({messages}) => {
    const [showMore, setShowMore] = useState(false);
    const [destinationFilter, setDestinationFilter] = useState(ALL);
    const [roleFilter, setRoleFilter] = useState(ALL);

    const filterByDestination = (chain) => {
        if (destinationFilter === ALL) return chain;
        else return chain.filter(message => message.destination === destinationFilter);
    }

    const filterByRole = (chain) => {
        if (roleFilter === ALL) return chain;
        else return chain.filter(message => message.roles === roleFilter);
    }

    const filterMessages = (chain) => {
        chain = filterByDestination(chain);
        chain = filterByRole(chain);
        return showMore ? chain : chain.take(ONLY_SHOW);
    }

    const messagesList = filterMessages(_.chain(messages)).map(message => (
        <tr key={message._id}>
            <td>{message.subject}</td>
            <td>{message.title}</td>
            <td>{message.message}</td>
            <td>{DESTINATIONS[message.destination]}</td>
            <td>{ROLES[message.roles]}</td>
        </tr>
    )).value();

    return (<Card>
                <CardHeader>
                    <Row>
                        <Col md="12">
                            <h5 className="title">Mensajes enviados</h5>
                        </Col>
                        <Col md="12">
                            <ButtonGroup
                                className="btn-group-toggle"
                                data-toggle="buttons"
                            >
                                <Button
                                    tag="label"
                                    className={classNames("btn-simple", {
                                        active: destinationFilter === ALL,
                                    })}
                                    color="info"
                                    id="0"
                                    size="sm"
                                    onClick={() => setDestinationFilter(ALL)}
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
                                        active: destinationFilter === ANY,
                                    })}
                                    onClick={() => setDestinationFilter(ANY)}
                                >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Solo todos los medios
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
                                        active: destinationFilter === EMAIL,
                                    })}
                                    onClick={() => setDestinationFilter(EMAIL)}
                                >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Solo Email
                        </span>
                                    <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                                </Button>
                            <Button
                                color="info"
                                id="2"
                                size="sm"
                                tag="label"
                                className={classNames("btn-simple", {
                                    active: destinationFilter === APP,
                                })}
                                onClick={() => setDestinationFilter(APP)}
                            >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Solo por App
                        </span>
                                <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                            </Button>
                            </ButtonGroup>
                        </Col>
                        <Col md="12">
                            <ButtonGroup
                                className="btn-group-toggle"
                                data-toggle="buttons"
                            >
                                <Button
                                    tag="label"
                                    className={classNames("btn-simple", {
                                        active: roleFilter === ALL,
                                    })}
                                    color="info"
                                    id="0"
                                    size="sm"
                                    onClick={() => setRoleFilter(ALL)}
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
                                        active: roleFilter === ANY,
                                    })}
                                    onClick={() => setRoleFilter(ANY)}
                                >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Solo ambos
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
                                        active: roleFilter === CUSTOMER,
                                    })}
                                    onClick={() => setRoleFilter(CUSTOMER)}
                                >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Solo a Pacientes
                        </span>
                                    <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                                </Button>
                                <Button
                                    color="info"
                                    id="2"
                                    size="sm"
                                    tag="label"
                                    className={classNames("btn-simple", {
                                        active: roleFilter === PROVIDER,
                                    })}
                                    onClick={() => setRoleFilter(PROVIDER)}
                                >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Solo a Prestadores
                        </span>
                                    <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody className="all-icons">
                    <Table className="tablesorter" responsive>
                        <thead className="text-primary">
                        <tr>
                            <th>Asunto</th>
                            <th>Titulo</th>
                            <th>Mensaje</th>
                            <th>Metodo de envío</th>
                            <th>Destinatario</th>
                        </tr>
                        </thead>
                        <tbody>
                        {messagesList}
                        </tbody>
                    </Table>
                    <Button className="btn-link btn btn-primary form-control" onClick={() => setShowMore(!showMore)}>
                        {showMore? 'Mostrar Menos' : 'Mostrar Todos'}</Button>
                </CardBody>
            </Card>
    );
}

export default MessageList;
