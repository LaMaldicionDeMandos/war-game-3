import React, { useState } from "react";
import {Accordion, Card} from "react-bootstrap";
import * as _ from "lodash";
import PracticeField from "../PracticeField/PracticeField";
import {MedicaAccordionTitle, MedikaAccordion} from "../MedikaAccordion/MedikaAccordion";
import practicesService from "../../services/practices.service";

// reactstrap components
const defaultPracticeHandler = practice => console.log('FROM SPECIALTY Selected practice ' + practice.name);

const Specialty = ({ specialty, filter, practiceHandler = defaultPracticeHandler }) => {
    const [practices, setPractices] = useState([]);

    const rc = <label>{specialty.size}</label>;
    const practiceViews = _.map(practices, (p, index) => <PracticeField key={p._id + index} practice={p} selectHandler={practiceHandler}></PracticeField>);

    const clickHandler = async () => {
        if(_.isEmpty(practices)) {
            const ps = await findPractices(specialty.category, specialty.specialty);
            setPractices(ps);
        }
    }

    const findPractices = (category, specialty) => practicesService.practices(category, specialty, filter);
    return (
        <Card>
            <Card.Header>
                <MedicaAccordionTitle eventKey={specialty.specialty} rightContent={rc} selectHandler={clickHandler}>{specialty.specialty}</MedicaAccordionTitle>
            </Card.Header>
            <Accordion.Collapse eventKey={specialty.specialty}>
                <MedikaAccordion style={{margin: 20}}>{practiceViews}</MedikaAccordion>
            </Accordion.Collapse>
        </Card>
    );
}

export default Specialty;
