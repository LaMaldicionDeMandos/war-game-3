import React from "react";
import {Row} from "reactstrap";

const RowZeroRowMargin = {
    marginLeft: 0,
    marginRight: 0
};

const FormLabelRow = ({children}) => {
    return (
        <Row style={RowZeroRowMargin}>
            <h5 className="title">{children}</h5>
        </Row>
    )
}

export default FormLabelRow;
