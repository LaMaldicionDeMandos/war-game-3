import React, { useState } from "react";
import {Accordion, Card} from "react-bootstrap";
import * as _ from "lodash";
import Specialty from "../Specialty/Specialty";
import {MedicaAccordionTitle, MedikaAccordion} from "../MedikaAccordion/MedikaAccordion";
import practicesService from "../../services/practices.service";

// reactstrap components

const defaultPracticeHandler = practice => console.log('FROM CATEGORY Selected practice ' + practice.name);

const Category = ({ category, filter, practiceHandler = defaultPracticeHandler }) => {
    const [specialties, setSpecialties] = useState([]);

    const rc = <label>{category.size}</label>;
    const specialtyViews = _.map(specialties, (sp, index) => <Specialty key={sp.specialty + index} specialty={sp} practiceHandler={practiceHandler}
    filter={filter}></Specialty>);

    const clickHandler = async () => {
        if(_.isEmpty(specialties)) {
            const sp = await findSpecialties(category.category);
            setSpecialties(sp);
        }
    }

    const findSpecialties = (category) => practicesService.specialties(category, filter).then(specialties =>
        _.map(specialties, sp => _.assign(sp, {category: category})));

    return (
        <Card>
            <Card.Header>
                <MedicaAccordionTitle eventKey={category.category} rightContent={rc} selectHandler={clickHandler}>{category.category}</MedicaAccordionTitle>
            </Card.Header>
            <Accordion.Collapse eventKey={category.category}>
                <MedikaAccordion style={{margin: 20}}>{specialtyViews}</MedikaAccordion>
            </Accordion.Collapse>
        </Card>
    );
}

export default Category;
