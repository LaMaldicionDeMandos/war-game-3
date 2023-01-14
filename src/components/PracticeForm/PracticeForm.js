import React, {useEffect, useState} from "react";
import _ from 'lodash';
import sessionService from '../../services/session.service';

// reactstrap components
import SweetAlert from "react-bootstrap-sweetalert";
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Form,
    FormGroup,
    CardFooter,
    Button
} from "reactstrap";
import {useForm} from "react-hook-form";
import FormLabelRow from "../FormLabelRow/FormLabelRow";

const PracticeForm = ({practice,
                          updateHandler = (p) => console.log('UPDATE MOCK'),
                          cancelHandler = (p) => console.log('CANCEL MOCK'),
                          deleteHandler = (p) => console.log('DELETE MOCK')}) => {
    const [isError, setIsError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        reset(practice);
    }, [practice]);

    const sanitizeForm = (form) => {
        return _.assign(form, {
            credits: form.credits? Number.parseFloat(form.credits) : undefined
        });
    }

    const onSubmit = (form) => {
        form = sanitizeForm(form);
        const update = _.chain(form).keys().reduce((up, k) => {
            if (form[k] != practice[k]) up[k] = form[k];
            return up;
        }, {}).value();
        updateHandler(update);
    }

    const onCancel = () => {
        setIsModalOpen(false);
        cancelHandler();
    }

    const onDelete = () => {
        setIsModalOpen(false);
        deleteHandler(practice);
    }

    return (
        <>
            {isModalOpen ? (<SweetAlert
                warning
                showCancel
                title="saraza"
                confirmBtnText="Se, borrala nomas!"
                confirmBtnBsStyle="primary"
                cancelBtnBsStyle="secondary"
                onConfirm={onDelete}
                onCancel={() => setIsModalOpen(false)}
            >
                Seguro queres borrar la práctica {practice.name}?
            </SweetAlert>) : ''}
            <Card>
                <CardHeader>
                    <h5 className="title">{practice.name}</h5>
                </CardHeader>
                <CardBody className="all-icons">
                    <Form>
                        <FormLabelRow>Datos Básicos</FormLabelRow>
                        <Row>
                            <Col className="pr-md-1" md="2">
                                <FormGroup>
                                    <label>Código</label>
                                    <input className="form-control"
                                           placeholder="104"
                                           disabled={true}
                                           type="text"
                                           {...register("code", {
                                               required: true,
                                               onChange: e => {
                                                   setIsError(false);
                                               }})}
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="px-md-1" md="5">
                                <FormGroup>
                                    <label>Categoría</label>
                                    <input className="form-control"
                                           placeholder="Odontología"
                                           type="text"
                                           disabled={true}
                                           {...register("category", {
                                               required: true,
                                               onChange: e => {
                                                   setIsError(false);
                                               }})}
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="px-md-1" md="5">
                                <FormGroup>
                                    <label>Especialidad</label>
                                    <input className="form-control"
                                           placeholder="Odontología Pediatrica"
                                           type="text"
                                           disabled={true}
                                           {...register("specialty", {
                                               required: true,
                                               onChange: e => {
                                                   setIsError(false);
                                               }})}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormLabelRow>Nombre</FormLabelRow>
                        <Row>
                            <Col className="pr-md-1" md="12">
                                <FormGroup>
                                    <label>Nombre</label>
                                    <input className="form-control"
                                           placeholder="PRACTICA QUIRURGICA DE ODONTOLOGIA CON ANESTESIA GENERAL"
                                           type="text"
                                           disabled={true}
                                           {...register("name", {
                                               required: true,
                                               onChange: e => {
                                                   setIsError(false);
                                               }})}
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="pr-md-1" md="12">
                                <FormGroup>
                                    <label>Nombre Amigable</label>
                                    <input className="form-control"
                                           placeholder="PRACTICA QUIRURGICA GENERAL"
                                           type="text"
                                           {...register("friendlyName", {
                                               required: false,
                                               onChange: e => {
                                                   setIsError(false);
                                               }})}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormLabelRow>Precio</FormLabelRow>
                        <Row>
                            <Col className="pr-md-1" md="6">
                                <FormGroup>
                                    <label>Créditos</label>
                                    <input className="form-control"
                                           placeholder="500"
                                           disabled={!sessionService.isGod()}
                                           type="number"
                                           {...register("credits", {
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
                    <Button className="btn-fill" color="secondary" type="submit" onClick={handleSubmit(onCancel)}>
                        Cancelar
                    </Button>
                    { sessionService.isGod() ?
                        (<Button className="btn-fill" color="danger" style={{float: 'right'}} type="submit" onClick={() => setIsModalOpen(!isModalOpen)}>
                        Eliminar
                    </Button>) : ''}
                </CardFooter>
            </Card>
        </>
    );
}

export default PracticeForm;
