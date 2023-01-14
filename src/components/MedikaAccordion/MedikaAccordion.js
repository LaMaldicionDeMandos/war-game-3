import React, {useContext} from "react";
import * as _ from 'lodash';
import './MedikaAccordion.scss';

// reactstrap components
import {Accordion, AccordionContext, useAccordionButton} from 'react-bootstrap';

const MedicaAccordionTitle = ({ children, rightContent, selectHandler = () => {},eventKey }) => {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(eventKey, () => selectHandler(eventKey));

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <a  onClick={decoratedOnClick} data-toggle="collapse" aria-expanded={isCurrentEventKey}>
            {children}
            <i className="tim-icons icon-minimal-down"></i>
            <div className="rc">{rightContent}</div>
        </a>
    );
}

const MedikaAccordion = ({children, style}) => {
    return (
        <Accordion className='medika-accordion' style={style}>
            {children}
        </Accordion>
    )
}

export { MedikaAccordion, MedicaAccordionTitle };
