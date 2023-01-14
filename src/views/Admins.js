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
import { useForm } from "react-hook-form";
import NotificationAlert from "react-notification-alert";
import usersService from '../services/users.service';
import * as _ from 'lodash';

// reactstrap components
import {Card, CardHeader, CardBody, Row, Col, Table, Form, FormGroup, UncontrolledAlert, CardFooter, Button} from "reactstrap";
import FormLabelRow from "../components/FormLabelRow/FormLabelRow";


const Admins = () => {
  const notificationAlertRef = React.useRef(null);
  const [admins, setAdmins] = useState([]);
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm();

  const onSubmit = form => {
    console.log(`send: ${form.username} - ${form.password} - ${form.firstName} - ${form.lastName}`);
    const user = {username: form.username, password: form.password, profile: {firstName: form.firstName, lastName: form.lastName}};
    usersService.newAdmin(user)
        .then(newUser => {
          setAdmins(admins => _.concat(admins, newUser));
        })
        .catch(e => processError(e));
  };

  useEffect(() => usersService.admins()
      .then(admins => setAdmins(admins)), []);

  const deleteHandler = (user) => () => {
    console.log(`deleting user ${user.username}`);
    usersService.deleteAdmin(user)
        .then(() => setAdmins(admins.filter((admin) => admin !== user)))
        .catch((e) => processError('Ops! no pudimos borrar al usuario.'));
  }

  const processError = (errorMessage) => {
    const message = errorMessage === 'user_already_exists' ? 'Este usuario ya existe, elige otro nombre de usuario.' : errorMessage;
    showErrorAlert(message, 'tc');
  }

  const showErrorAlert = (message, place) => {
    const options = {
      place: place,
      message: (
          <div>
            <div>
              {message}
            </div>
          </div>
      ),
      type: 'danger',
      icon: "tim-icons icon-alert-circle-exc",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  }

  const fields = _.map(admins, (admin) =>
      (
          <tr key={admin._id}>
            <td>{admin.username}</td>
            <td>{`${admin.profile?.firstName || ''} ${admin.profile?.lastName || ''}`}</td>
            <td><button className="btn-sm btn-link btn-icon btn-simple btn-danger" onClick={deleteHandler(admin)}><i className="zmdi zmdi-delete"></i></button></td>
          </tr>));

  return (
    <div className="content">
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Row>
        <Col md="4">
          <Card>
            <CardHeader>
              <h5 className="title">Administradores</h5>
            </CardHeader>
            <CardBody className="all-icons">
              <Row>
                <Col className="col-12">
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                    <tr>
                      <th>Usuario</th>
                      <th>Nombre</th>
                      <th>Eliminar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {fields}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col md="8">
          <Card>
            <CardHeader>
              <h5 className="title">Nuevo Admin</h5>
            </CardHeader>
            <CardBody>
              <Form>
                <FormLabelRow>Credenciales</FormLabelRow>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Nombre de usuario</label>
                      <input className="form-control"
                          placeholder="admin"
                          type="text"
                          {...register("username", {
                            required: true,
                            onChange: e => {
                              setIsError(false);
                            }})}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="6">
                    <FormGroup>
                      <label>Password</label>
                      <input className="form-control"
                          placeholder="password"
                          type="password"
                          {...register("password", {
                            required: true,
                            onChange: e => {
                              setIsError(false);
                            }})}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <br/>
                <FormLabelRow>Perfil</FormLabelRow>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Nombre</label>
                      <input className="form-control"
                          placeholder="Alberto"
                          type="text"
                          {...register("firstName", {
                            required: false,
                            onChange: e => {
                              setIsError(false);
                            }})}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Apellidos</label>
                      <input className="form-control"
                          placeholder="Einstein"
                          type="text"
                          {...register("lastName", {
                            required: false,
                            onChange: e => {
                              setIsError(false);
                            }})}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
            <CardFooter>
              <Button className="btn-fill" color="primary" type="submit" onClick={handleSubmit(onSubmit)}>
                Confirmar
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Admins;
