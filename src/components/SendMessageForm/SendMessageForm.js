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
import React, {useState} from "react";
import * as _ from 'lodash';
import messagesService from '../../services/messages.service';

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Table,
    Button, FormGroup, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, CardFooter
} from "reactstrap";
import {useForm} from "react-hook-form";

const ANY = {code: 'any', value: 'Todos'};
const EMAIL = {code: 'email', value:'Email'};
const APP = {code: 'app', value:'App'};
const CUSTOMER = {code: 'customer_only', value:'Solo a Pacientes'};
const PROVIDER = {code: 'provider_only', value:'Solo a Prestadores'};

const SendMessageForm = ({onSuccess, onError}) => {

    const [isError, setIsError] = useState(false);
    const [isDestinationOpen, setDestinationOpen] = useState(false);
    const [isRolesOpen, setRolesOpen] = useState(false);
    const [destination, setDestination] = useState({code: 'any', value: 'Todos'});
    const [roles, setRoles] = useState({code: 'any', value: 'Todos'});

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = (form) => {
        messagesService.sendMessage(_.assign(form, {destination: destination.code, roles: roles.code}))
            .then((m) => onSuccess(m))
            .catch(e => onError(e));
    }

    return (<Card>
                <CardHeader>
                    <Row>
                        <Col md="12">
                            <h5 className="title">Mensajes Masivos</h5>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody className="all-icons">
                    <Row>
                        <Col md="3">
                            <FormGroup>
                                <label>Metodo de envío</label>
                                <UncontrolledDropdown isOpen={isDestinationOpen} toggle={() => setDestinationOpen(!isDestinationOpen)}>
                                    <DropdownToggle color="info" caret data-toggle="dropdown" className="form-control">
                                        {destination ? destination.value : 'Destíno'}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => setDestination(ANY)}>{ANY.value}</DropdownItem>
                                        <DropdownItem onClick={() => setDestination(EMAIL)}>{EMAIL.value}</DropdownItem>
                                        <DropdownItem onClick={() => setDestination(APP)}>{APP.value}</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                                <label>Destinatarios</label>
                                <UncontrolledDropdown isOpen={isRolesOpen} toggle={() => setRolesOpen(!isRolesOpen)}>
                                    <DropdownToggle color="info" caret data-toggle="dropdown" className="form-control">
                                        {roles ? roles.value : 'Destinatarios'}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => setRoles(ANY)}>{ANY.value}</DropdownItem>
                                        <DropdownItem onClick={() => setRoles(CUSTOMER)}>{CUSTOMER.value}</DropdownItem>
                                        <DropdownItem onClick={() => setRoles(PROVIDER)}>{PROVIDER.value}</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <label>Asunto</label>
                                <input className="form-control"
                                       placeholder="Novedades de Enero"
                                       type="text"
                                       {...register("subject", {
                                           required: true,
                                           onChange: e => {
                                               setIsError(false);
                                           }})}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <label>Titulo</label>
                                <input className="form-control"
                                       placeholder="Novedades de Enero"
                                       type="text"
                                       {...register("title", {
                                           required: false,
                                           onChange: e => {
                                               setIsError(false);
                                           }})}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <label>Mensaje</label>
                                <textarea className="form-control" style={{padding: 10, minHeight: 300}}
                                          placeholder="Queremos recordarles que los queremos mucho"
                                          type="text"
                                          {...register("message", {
                                              required: true,
                                              onChange: e => {
                                                  setIsError(false);
                                              }})}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <Button className="btn-fill form-control" color="primary" type="submit" onClick={handleSubmit(onSubmit)}>
                        Envíar
                    </Button>
                </CardFooter>
            </Card>
    );
}

export default SendMessageForm;
