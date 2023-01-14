import React from "react";
import {Card} from "react-bootstrap";
import './ParcticeField.scss';

// reactstrap components

const defaultSelectHandler = (p) => console.log('Selected practice ' + JSON.stringify(p));

const PracticeField = ({ practice, selectHandler = defaultSelectHandler}) => {
    const clickHandler = () => {
        selectHandler(practice);
    }
    return (
        <Card className="practice-field">
            <Card.Header>
                <a onClick={clickHandler}>
                    {practice.name}
                    <i className="tim-icons icon-minimal-right"></i>
                </a>
            </Card.Header>
        </Card>
    );
}

export default PracticeField;
