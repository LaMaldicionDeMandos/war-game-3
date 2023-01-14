import React, {useState} from "react";
import {CardHeader, Collapse} from "reactstrap";

const CollapsePanel = ({header, children}) => {
    const [isOpen, setOpen] = useState(false);
    return (
        <div className="collapse-panel">
            <CardHeader onClick={() => setOpen(!isOpen)} style={{paddingBottom: 10}}>
                <a data-toggle="collapse" aria-expanded={isOpen}>
                    {header}
                    <i className="tim-icons icon-minimal-down arrow" style={{float: 'right',marginTop: 5, marginBottom: 5}}></i>
                </a>
            </CardHeader>
            <Collapse isOpen={isOpen}>
                {children}
            </Collapse>
        </div>
    );
}

export default CollapsePanel;
