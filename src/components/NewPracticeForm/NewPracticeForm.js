import React, {useEffect, useState} from "react";
import _ from 'lodash';
import sessionService from '../../services/session.service';
import practiceService from '../../services/practices.service';

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Form,
    FormGroup,
    CardFooter,
    Button,
    UncontrolledDropdown, DropdownToggle, NavLink, DropdownItem, DropdownMenu
} from "reactstrap";
import {useForm} from "react-hook-form";
import FormLabelRow from "../FormLabelRow/FormLabelRow";

const NewPracticeForm = ({saveHandler = (p) => console.log('NEW MOCK'), cancelHandler = () => console.log('CANCEL MOCK')}) => {
    const [isError, setIsError] = useState(false);
    const [cartTypes, setCartTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [specialties, setSpecialties] = useState([]);

    useEffect(() => {
        practiceService.cartTypes().then(setCartTypes);
    }, []);

    useEffect(() => {
        practiceService.categories()
            .then(categories => _.map(categories, (cat) => _.assign(cat, {specialties: undefined})))
            .then(setCategories);
    }, []);

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors }
    } = useForm();

    const sanitizeForm = (form) => {
        return _.assign(form, {
            credits: form.credits? Number.parseFloat(form.credits) : undefined
        });
    }

    const onSubmit = (form) => {
        form = sanitizeForm(form);
        saveHandler(form);
    }

    const onCancel = () => {
        cancelHandler();
    }

    const selectCategory = async (category) => {
        if (category.specialties) {
            setSpecialties(category.specialties);
        } else {
            const specialties = await practiceService.specialties(category.category);
            category.specialties = specialties;
            setSpecialties(category.specialties);
        }
        reset({category: category.category, specialty: undefined});
    }

    const selectCartType = async (cartType) => {
        reset({cartType: cartType});
    }

    const cartTypeItems = _.map(cartTypes, (cart) => (
        <NavLink tag="li" key={cart}>
            <DropdownItem className="nav-item" onClick={() => selectCartType(cart)}>{cart}</DropdownItem>
        </NavLink>
    ));

    const categoryItems = _.map(categories, (cat) => (
        <NavLink tag="li" key={cat.category}>
            <DropdownItem className="nav-item" onClick={() => selectCategory(cat)}>{cat.category}</DropdownItem>
        </NavLink>
    ));

    const specialtyItems = _.map(specialties, (sp) => (
        <NavLink tag="li" key={sp.specialty}>
            <DropdownItem className="nav-item" onClick={() => reset({specialty: sp.specialty})}>{sp.specialty}</DropdownItem>
        </NavLink>
    ))
    return (
        <Card>
            <CardHeader>
                <h5 className="title">Nueva Practica</h5>
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
                                       type="text"
                                       {...register("code", {
                                           required: true,
                                           onChange: e => {
                                               setIsError(false);
                                           }})}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="px-md-1" md="4">
                            <FormGroup>
                                <label>Cartilla</label>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret color="default" nav onClick={(e) => e.preventDefault()}>
                                        <input className="form-control"
                                               placeholder="Elige una o escribe una nueva"
                                               type="text"
                                               {...register("cartType", {
                                                   required: true,
                                                   onChange: e => {
                                                       setIsError(false);
                                                   }})}
                                        />
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-navbar" tag="ul">
                                        {cartTypeItems}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>
                        </Col>
                        <Col className="px-md-1" md="4">
                            <FormGroup>
                                <label>Categoría</label>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret color="default" nav onClick={(e) => e.preventDefault()}>
                                        <input className="form-control"
                                               placeholder="Elige una o escribe una nueva"
                                               type="text"
                                               {...register("category", {
                                                   required: true,
                                                   onChange: e => {
                                                       setIsError(false);
                                                   }})}
                                        />
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-navbar" tag="ul">
                                        {categoryItems}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>
                        </Col>
                        <Col className="px-md-1" md="4">
                            <FormGroup>
                                <label>Especialidad</label>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret color="default" nav onClick={(e) => e.preventDefault()}>
                                        <input className="form-control"
                                               placeholder="Elige una o escribe una nueva"
                                               type="text"
                                               {...register("specialty", {
                                                   required: true,
                                                   onChange: e => {
                                                       setIsError(false);
                                                   }})}
                                        />
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-navbar" tag="ul">
                                        {specialtyItems}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
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
                <Button className="btn-fill" style={{float: 'right'}} color="secondary" type="submit" onClick={onCancel}>
                    Cancelar
                </Button>
            </CardFooter>
        </Card>
    );
}

export default NewPracticeForm;
