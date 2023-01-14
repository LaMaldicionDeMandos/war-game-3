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
import React, {useCallback, useEffect, useState} from "react";
import {useDropzone} from 'react-dropzone'
import * as _ from 'lodash';
import classNames from "classnames";

// reactstrap components
import {Card, CardHeader, CardBody, Row, Col, Form, FormGroup, ButtonGroup, Button} from "reactstrap";
import {MedikaAccordion} from "../components/MedikaAccordion/MedikaAccordion";
import practicesService from '../services/practices.service';
import Category from "../components/Category/Category";
import PracticeForm from "../components/PracticeForm/PracticeForm";
import NotificationAlert from "react-notification-alert";
import NewPracticeForm from "../components/NewPracticeForm/NewPracticeForm";
import BigButton from "../components/BigButton/BigButton";
import uploadLogo from "../assets/img/image_placeholder.jpg";

const ALL_FILTER = 'all';
const ONLY_INCOMPLETE_FILTER = 'incompleteOnly';
const ONLY_COMPLETE_FILTER = 'completeOnly';

const FILTER_TITLES = {
  all: 'Todas las prácticas',
  only_incomplete: 'Solo prácticas incompletas',
  only_complete: 'Solo prácticas completas'
};

const UPLOAD_ERRORS = {
  invalid_header: 'Titulo invalido',
  invalid_cart: 'Cartilla invalida',
  invalid_category: 'Categoria invalida',
  invalid_specialty: 'Especialiad invalida',
  invalid_practice: 'Practica invalida',
  invalid_code: 'Codigo invalio',
  invalid_friendlyName: 'Friendly name invalido',
  invalid_credits: 'Creditos invalidos',
}

const Practices = () => {
  const notificationAlertRef = React.useRef(null);
  const [categories, setCategories] = useState([]);
  const [practice, setPractice] = useState();
  const [newPractice, setNewPractice] = useState();
  const [filter, setFilter] = useState(ALL_FILTER);

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      practicesService.upload(file)
        .then((image) => {
          showSuccessAlert('Joya!! Ya se cargaron las practicas médicas!');
        })
        .catch((e) => {
          const errors = _.chain(e).take(5).map((error, index) => {
            return (<li key={'error' + index}>{`Linea: ${error.line} -> ${UPLOAD_ERRORS[error.code]} valor esperado: ${error.expected}, valor actual: ${error.current}`}</li>);
          }).value();
          const errorView = (<div><label>Algunos erroes</label><ul>{errors}</ul></div>);
          showErrorAlert(errorView);
        });
    })
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop: onDrop, accept: 'text/*', maxFiles: 1});

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
      autoDismiss: 15,
    };
    notificationAlertRef.current.notificationAlert(options);
  }

  const showErrorAlert = (message, place = 'tc') => {
    showAlert(message, 'danger', 'icon-alert-circle-exc');
  }

  const showSuccessAlert = (message, place = 'tc') => {
    showAlert(message, 'success', 'icon-check-2');
  }

  const findCategories = async (f) => {
    const categories = await practicesService.categories(f || filter);
    setCategories(categories);
  }

  useEffect(async () => {
    findCategories();
  }, []);

  const practiceHandler = setPractice;

  const categoryItems = _.map(categories, (cat, index) => <Category key={cat.category + index} category={cat} practiceHandler={practiceHandler}
    filter={filter}></Category>);

  const updateHandler = (delta) => {
    console.log(`Update practice => ${JSON.stringify(delta)}`);
    practicesService.updatePractice(practice._id, delta)
        .then(() => {
          _.assign(practice, delta);
          setPractice(undefined);
          findCategories();
          showSuccessAlert('La practica fue modificada correctamente 😃');
        }).catch(e => {
          console.log(JSON.stringify(e));
          showErrorAlert('Ops! 😅 Algo salió mal, volvé a intentarlo cuando alguien lo arregle! ')
        });
  }

    const deleteHandler = (practice) => {
        console.log(`Delete practice => ${JSON.stringify(practice)}`);
        practicesService.deletePractice(practice)
            .then(() => {
                setPractice(undefined);
                findCategories();
                showSuccessAlert('La practica fue eliminada correctamente 😃');
            }).catch(e => {
            console.log(JSON.stringify(e));
            showErrorAlert('Ops! 😅 Algo salió mal, volvé a intentarlo cuando alguien lo arregle! ')
        });
    }

  const newPracticeHandler = (practice) => {
    practicesService.newPractice(practice)
        .then(() => findCategories())
        .then(() => showSuccessAlert(`La práctica ${practice.name} se creó correctamente`))
        .then(() => setNewPractice(false))
        .catch(() => {
          showErrorAlert('Ops! 😅 Algo salió mal, volvé a intentarlo cuando alguien lo arregle!');
          setNewPractice(false);
        });
  }

  const cancelPracticeHandler = () => {
    setNewPractice(false);
  }

  const onNewPractice = () => {
    setNewPractice(true);
  }

  const selectFilter = (f) => {
    setFilter(f);
    findCategories(f);
  }

   return (
    <div className="content">
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Row>
        <Col md="6">
          <div className="fileinput text-center" {...getRootProps()} style={{marginBottom: 15}}>
            <input {...getInputProps()} />
            {
              <>
                <div className="thumbnail">
                  <img src={uploadLogo} width={200} height={150}/>
                </div>
                <Button className="btn btn-primary">Seleccionar archivo tsv</Button>
              </>
            }
          </div>
        </Col>
        <Col md="6">
            <BigButton handler={onNewPractice} iconClass="tim-icons icon-simple-add" label="Nueva Practica" />
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Card>
            <CardHeader>
              <Row>
                <Col md="5">
                  <h5 className="title">{FILTER_TITLES[filter]}</h5>
                </Col>
                <Col md="7">
                  <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                  >
                    <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: filter === ALL_FILTER,
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => selectFilter(ALL_FILTER)}
                    >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Todas
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
                          active: filter === ONLY_INCOMPLETE_FILTER,
                        })}
                        onClick={() => selectFilter(ONLY_INCOMPLETE_FILTER)}
                    >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Solo Incompletas
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
                          active: filter === ONLY_COMPLETE_FILTER,
                        })}
                        onClick={() => selectFilter(ONLY_COMPLETE_FILTER)}
                    >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Solo Completas
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
              <Row>
                <Col className="col-12">
                  <MedikaAccordion>{categoryItems}</MedikaAccordion>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        {newPractice ? (
            <Col md={6}>
              <NewPracticeForm saveHandler={newPracticeHandler} cancelHandler={cancelPracticeHandler}></NewPracticeForm>
            </Col>
        ) : ''}
        {practice ? (
            <Col md={6}>
              <PracticeForm practice={practice}
                            updateHandler={updateHandler}
                            cancelHandler={() => setPractice(undefined)}
                            deleteHandler={deleteHandler}
              ></PracticeForm>
            </Col>
        ) : ''}
      </Row>
    </div>
  );
}

export default Practices;
