import React, {useState} from "react";
import * as _ from "lodash";
import {DropdownItem, DropdownMenu, DropdownToggle, FormGroup, NavLink, UncontrolledDropdown} from "reactstrap";

const DropdownFilter = ({collection, comparablePropertyName, visualPropertyName, placeholder = 'Buscar...', handler = (item) => {}}) => {
    const visualProp = visualPropertyName || comparablePropertyName;
    const [item, setItem] = useState();
    const [itemFilter, setItemFilter] = useState('');

    const itemFilterValue = (item && item[comparablePropertyName]) || itemFilter;

    const itemHandler = (it) => {
        setItem(it);
        handler(it);
    }

    const items = _.chain(collection).filter((it) => it[comparablePropertyName].match(itemFilter)).map((it) => (
        <NavLink tag="li" key={it[comparablePropertyName]}>
            <DropdownItem className="nav-item" onClick={() => itemHandler(it)}>{it[visualProp]}</DropdownItem>
        </NavLink>
    )).value();

    return (
        <UncontrolledDropdown>
            <DropdownToggle caret color="default" nav onClick={(e) => e.preventDefault()}>
                <input className="form-control"
                       placeholder={placeholder}
                       type="text"
                       value={itemFilterValue}
                       onChange={(e) => {
                           if (e.target.value !== (item && item[comparablePropertyName])) itemHandler(undefined);
                           setItemFilter(e.target.value);
                       }}
                />
            </DropdownToggle>
            <DropdownMenu className="dropdown-navbar" tag="ul">
                {items}
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

export default DropdownFilter;
