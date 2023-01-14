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
import creditsservice from "../services/credits.service";
import * as _ from 'lodash';

// reactstrap components
import {Card, CardHeader, CardBody, Row, Col, Table, Form, FormGroup, CardFooter, Button} from "reactstrap";
import FormLabelRow from "../components/FormLabelRow/FormLabelRow";
import NumberFormat from "react-number-format";


const Packages = () => {
  const notificationAlertRef = React.useRef(null);
  const [packages, setPackages] = useState([]);
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm();

  const onSubmit = form => {
    _.assign(form, {credits: Number.parseFloat(form.credits)});
    console.log(`Form: ${JSON.stringify(form)}`);
    creditsservice.newPackage(form)
        .then(() => {
          showSuccessAlert('Bien!! ya se agregó el paquete ' + form.title);
          creditsservice.packages().then(setPackages);
        })
        .catch(() => showErrorAlert('Ops! no pudimos agregar el paquete.'));
  };

  useEffect(() => {
    creditsservice.packages().then(setPackages);
  }, []);

  const deleteHandler = (pack) => () => {
    console.log(`deleting package ${pack.title}`);
    creditsservice.removePackage(pack)
        .then(() => {
          showSuccessAlert('Bien!! ya se elimino el paquete ' + pack.title);
          creditsservice.packages().then(setPackages);
        })
        .catch(() => showErrorAlert('Ops! no pudimos borrar el paquete.'));
  }

  const showErrorAlert = (message, place = 'tc') => {
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

  const showSuccessAlert = (message, place = 'tc') => {
    const options = {
      place: place,
      message: (
        <div>
          <div>
            {message}
          </div>
        </div>
      ),
      type: 'success',
      icon: "tim-icons icon-check-2",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  }

  const fields = _.map(packages, (pack) =>
      (
          <tr key={pack._id}>
            <td>{pack.code}</td>
            <td>{pack.title}</td>
            <td>{pack.description}</td>
            <td><NumberFormat value={pack.credits} thousandSeparator="." decimalSeparator="," displayType={"text"}
                prefix={'🪙'} /></td>
            <td><button className="btn-sm btn-link btn-icon btn-simple btn-danger" onClick={deleteHandler(pack)}><i className="zmdi zmdi-delete"></i></button></td>
          </tr>));

  return (
    <div className="content">
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Row>
        <Col md="7">
          <Card>
            <CardHeader>
              <h5 className="title">Paquetes</h5>
            </CardHeader>
            <CardBody className="all-icons">
              <Row>
                <Col className="col-12">
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                    <tr>
                      <th>Código</th>
                      <th>Nombre</th>
                      <th>Descripcion</th>
                      <th>Creditos</th>
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
        <Col md="5">
          <Card>
            <CardHeader>
              <h5 className="title">Nuevo Packete</h5>
            </CardHeader>
            <CardBody>
              <Form>
                <FormLabelRow>Información</FormLabelRow>
                <Row>
                  <Col className="pr-md-1" md="6">
                    <FormGroup>
                      <label>Código</label>
                      <input className="form-control"
                          placeholder="Ej. P1000"
                          type="text"
                          {...register("code", {
                            required: true,
                            onChange: e => {
                              setIsError(false);
                            }})}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-md-1" md="6">
                    <FormGroup>
                      <label>Nombre</label>
                      <input className="form-control"
                          placeholder="Ej. 1000 Creditos"
                          type="text"
                          {...register("title", {
                            required: true,
                            onChange: e => {
                              setIsError(false);
                            }})}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-md-1" md="12">
                    <FormGroup>
                      <label>Descripción</label>
                      <input className="form-control"
                          placeholder="Ej. Paquete de 1000 Creditos"
                          type="text"
                          {...register("description", {
                            required: false,
                            onChange: e => {
                              setIsError(false);
                            }})}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormLabelRow>Valores</FormLabelRow>
                <Row>
                  <Col className="pl-md-1" md="6">
                    <FormGroup>
                      <label>Creditos</label>
                      <input className="form-control"
                          placeholder="Ej. 1000"
                          type="number"
                          {...register("credits", {
                            required: true,
                            min: 1,
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

export default Packages;
