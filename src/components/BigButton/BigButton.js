import {Card, CardBody} from "reactstrap";
import React from "react";

const BigButton = ({handler, iconClass, label, color = 'info'}) => {
    return <Card className="card-plain">
        <CardBody>
            <ul className={`nav-pills-${color} nav-pills-icons justify-content-center nav nav-pills`}>
                <li className="nav-item" onClick={handler}>
                    <a data-toggle="tab" className="active nav-link">
                        <i className={iconClass}></i>
                        {label}
                    </a>
                </li>
            </ul>
        </CardBody>
    </Card>;
}

export default BigButton;
