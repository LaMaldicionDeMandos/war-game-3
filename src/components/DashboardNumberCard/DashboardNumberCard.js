import React from "react";
import {Card, CardBody, Col, Row} from "reactstrap";
import "./DashboardNumberCard.scss";

const DashboardNumberCard = (props) => {
    const iconClass = props.iconClass || '';
    const icon = props.icon || '';
    return (
        <Card>
            <CardBody>
                <Row>
                    <Col md="5">
                        <div className={iconClass + ' info-icon text-center'}>
                            <i className={`tim-icons ${icon}`}></i>
                        </div>
                    </Col>
                    <Col md="7">
                        <div className="numbers">
                            <p className="card-category">{props.title}</p>
                            <h3>{props.value}</h3>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default DashboardNumberCard;
