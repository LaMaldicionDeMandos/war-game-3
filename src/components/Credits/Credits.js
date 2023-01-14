import React from "react";
import NumberFormat from 'react-number-format';

const DEFAULT_PREFIX = '🪙';

const Credits = (props) => {
    const credits = props.credits || 0;
    const defaultPrefix = props.defaultPrefix;
    const prefix = props.prefix;
    return (
        <NumberFormat
            value={credits}
            thousandSeparator="."
            decimalSeparator=","
            displayType={"text"}
            prefix={prefix || (defaultPrefix ? DEFAULT_PREFIX : '')}>

        </NumberFormat>

    );
}

export default Credits;
