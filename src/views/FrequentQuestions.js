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
import * as _ from 'lodash';

import questionsService from '../services/questions.service';
// reactstrap components
import {Card, CardHeader, CardBody, Row, Col, Table, Form, FormGroup, CardFooter, Button} from "reactstrap";
import {Link} from "react-router-dom";
import {TextareaAutosize} from "@mui/material";
import messagesService from "../services/messages.service";

const FrequentQuestions = () => {
  const notificationAlertRef = React.useRef(null);
  const [questions, setQuestions] = useState([]);
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch
  } = useForm();

  const onSubmit = form => {
    questionsService.newQuestion(form)
      .then((q) => onSuccess(q))
      .catch(onError);
  };

  const onSuccess = (question) => {
    showSuccessAlert('La pregunta ya fue agregada!');
    setQuestions(_.concat([question], questions));
  }

  const onError = (e) => {
    showErrorAlert('Ops! algo salió mal.');
  }

  useEffect(() => {
    questionsService.questions().then(setQuestions);
  }, []);

  const deleteHandler = (question) => () => {
    questionsService.deleteQuestion(question)
      .then(() => {
        showSuccessAlert('La Pregunta fue eliminada.');
        const qs = _.clone(questions);
        _.remove(qs, (q) => q === question);
        setQuestions(qs);
      })
      .catch(onError)
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

  const fields = _.map(questions, (question) =>
      (
          <tr key={question._id}>
            <td>{question.question}</td>
            <td>{question.answer || (<a href={question.link} target="_blank" rel="noopener noreferrer">{question.link}</a>)}</td>
            <td><button className="btn-sm btn-link btn-icon btn-simple btn-danger" onClick={deleteHandler(question)}><i className="zmdi zmdi-delete"></i></button></td>
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
              <h5 className="title">Preguntas Frecuentes</h5>
            </CardHeader>
            <CardBody className="all-icons">
              <Row>
                <Col className="col-12">
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                    <tr>
                      <th>Pregunta</th>
                      <th>Respuesta</th>
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
              <h5 className="title">Nueva Pregunta Frecuente</h5>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col className="pr-md-1" md="12">
                    <FormGroup>
                      <label>Pregunta</label>
                      <input className="form-control"
                          placeholder="Ej. ¿Dios existe?"
                          type="text"
                          {...register("question", {
                            required: true,
                            onChange: e => {
                              setIsError(false);
                            }})}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-md-1" md="12">
                    <FormGroup>
                      <label>Respuesta</label>
                      <TextareaAutosize style={{maxHeight: 'none'}} className="form-control"
                          placeholder="Ej. No, pero si lo decis te vas al infierno"
                          type="text" disabled={watch('link')}
                          {...register("answer", {
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
                      <label>Link</label>
                      <input className="form-control"
                          placeholder="Ej. https://www.mercadopago.com.ar/ayuda"
                          type="text" disabled={watch('answer')}
                          {...register("link", {
                            required: false,
                            pattern: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig,
                            onChange: e => {
                              setIsError(false);
                            }})}
                      />
                      {errors.link &&
                      (getValues("link").length > 0 ? (
                        <label className="error">Debe ser una url válida.</label>
                      ) : '')}
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

export default FrequentQuestions;
