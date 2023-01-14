import React from "react";
import FormLabelRow from "../FormLabelRow/FormLabelRow";
import {CardBody, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import NumberFormat from 'react-number-format';
import WalletOperationWidget from "../WalletOperationWidget/WalletOperationWidget";

import * as _ from 'lodash';

const DATE_FORMATTER = new Intl.DateTimeFormat('es-AR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'})

const PurchaseComponent = ({record}) => {
    return (
        <CardBody>
            <Row>
                <FormLabelRow><b>{record.owner}</b>{` compró el paquete ${record.from}`}</FormLabelRow>
            </Row>
            <Row>
                <Col md="6">
                    <Row>Se compraron: &nbsp; <NumberFormat value={record.credits}
                                                    thousandSeparator="."
                                                    decimalSeparator=","
                                                    displayType={"text"}/> &nbsp;Creditos</Row>
                    <Row>Se pagaron:&nbsp; <NumberFormat value={record.price}
                                                  thousandSeparator="."
                                                  decimalSeparator=","
                                                  displayType={"text"}
                                                  prefix="$" /></Row>
                    <Row>
                        Ingresáron:&nbsp;<NumberFormat value={record.fund}
                                      thousandSeparator="."
                                      decimalSeparator=","
                                      displayType={"text"}
                                      prefix="$" />
                    </Row>
                </Col>
                <Col md="6">
                    <FormLabelRow><Link to="#"><span style={{color: 'white', fontWeight: 'bold'}}>Operación:</span> {record.operation_id}</Link></FormLabelRow>
                    <FormLabelRow><Link to="#"><span style={{color: 'white', fontWeight: 'bold'}}>Transacción:</span> {record.transaction_id}</Link></FormLabelRow>
                </Col>
            </Row>
        </CardBody>
    )
}

const POSITIVE_CONDITION = 'green';
const NEUTRAL_CONDITION = 'khaki';
const NEGATIVE_CONDITION = 'orangered';
const MoneyComponent = ({record}) => {
    const OPERATIONS = {
        'credits-purchase': {
            label: 'Compra de Creditos',
            condition: POSITIVE_CONDITION
        },
        'reserve-to-pay': {
            label: 'Reservado para pagar',
            condition: NEUTRAL_CONDITION
        },
        'cancel-reservation': {
            label: 'Se cancela reservación',
            condition: NEUTRAL_CONDITION
        },
        'pay-to-customer': {
            label: 'Pago a Prestador',
            condition: NEGATIVE_CONDITION
        },
        'cash-out': {
            label: 'Retiro de Dinero',
            condition: NEGATIVE_CONDITION
        }
    }

    return (
        <CardBody>
            <Row>
                <FormLabelRow>{OPERATIONS[record.operation].label} -> &nbsp;
                    <b><NumberFormat value={record.amount} style={{color: OPERATIONS[record.operation].condition}}
                             thousandSeparator="."
                             decimalSeparator=","
                             prefix="$"
                             displayType={"text"}/></b></FormLabelRow>
            </Row>
        </CardBody>
    )
}

const WalletComponent = ({record}) => {
    return (
        <CardBody>
            <Row>
                <FormLabelRow><b>{record.customer}</b></FormLabelRow>
            </Row>
            <Row>
                <td style={{borderTop: 'none'}}>
                    <WalletOperationWidget operation={record.operation}/>
                    <FormLabelRow>
                        <b>
                            <NumberFormat value={record.amount}
                                          thousandSeparator="."
                                          decimalSeparator=","
                                          displayType={"text"}/>
                        </b>
                    </FormLabelRow>
                </td>
            </Row>
        </CardBody>
    )
}

const PRACTICE_STATE = {
    pending: {
        label: 'Pendiente',
        color: 'orange'
    },
    approved: {
        label: 'Aprobada',
        color: 'lightgreen'
    },
    paid: {
        label: 'Pagada',
        color: 'green'
    },
    canceled: {
        label: 'Cancelada',
        color: 'red'
    }
}

const PracticeComponent = ({record}) => {
    const practices = _.map(record.practiceNames, name => <FormLabelRow key={name}><b>{name}</b></FormLabelRow>);
    return (
        <CardBody>
            <Row>
                <Col md="12">
                    {practices}
                </Col>
            </Row>
            <Row>
                <Col md="5">
                    <FormLabelRow>Prestador: <b>{record.providerUsername}</b></FormLabelRow>
                    <FormLabelRow>Precio: &nbsp;
                        <b><NumberFormat value={record.price}
                                         thousandSeparator="."
                                         decimalSeparator=","
                                         prefix="$"
                                         displayType={"text"}/></b>
                    </FormLabelRow>
                    <FormLabelRow>Transacción: &nbsp;<b>{record.transactionId}</b></FormLabelRow>
                </Col>
                <Col md="5">
                    <FormLabelRow>Paciente: <b>{record.customerUsername}</b></FormLabelRow>
                    <FormLabelRow>Pago: &nbsp;
                        <b><NumberFormat value={record.credits}
                                         thousandSeparator="."
                                         decimalSeparator=","
                                         displayType={"text"}/></b> &nbsp;Creditos
                    </FormLabelRow>
                </Col>
                <Col md="2">
                    <FormLabelRow><b style={{color: PRACTICE_STATE[record.state].color}}>{PRACTICE_STATE[record.state].label}</b></FormLabelRow>
                </Col>
            </Row>
        </CardBody>
    )
}

const DummyComponent = ({record}) => {
    return <label>{record._id}</label>
}

const OPERATION_TYPES = {
    purchase: {
        label: 'Compra de Creditos',
        iconClass: 'icon-info',
        icon: 'tim-icons icon-money-coins',
        Component: PurchaseComponent
    },
    money: {
        label: 'Movimiento de Dinero',
        iconClass: 'icon-success',
        icon: 'zmdi zmdi-money-box',
        Component: MoneyComponent
    },
    wallet: {
        label: 'Movimiento de Creditos',
        iconClass: 'icon-primary',
        icon: 'tim-icons icon-wallet-43',
        Component: WalletComponent
    },
    practice: {
        label: 'Practicas Médicas',
        iconClass: 'icon-warning',
        icon: 'zmdi zmdi-assignment-o',
        Component: PracticeComponent
    }
};

const ArchiveRecord = ({ record }) => {
    const operation = OPERATION_TYPES[record.type];
    return (
        <tr>
            <td style={{width: 58}}>
                <div className={`${operation.iconClass} info-icon text-center`}>
                    <i className={operation.icon}></i>
                </div>
            </td>
            <td style={{paddingLeft: 32}}>
                <Row><FormLabelRow>{operation.label}</FormLabelRow></Row>
                <Row><FormLabelRow>{DATE_FORMATTER.format(Date.parse(record.createdAt))}</FormLabelRow></Row>
            </td>
            <td>
                { operation.Component({record: record})}
            </td>
        </tr>
    );
}

export default ArchiveRecord;
