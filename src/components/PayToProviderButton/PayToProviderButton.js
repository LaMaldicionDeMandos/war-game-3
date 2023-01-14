import React from "react";
import AbstractActionUserButton from "../AbstractActionProviderButton/AbstractActionUserButton";
import {useHistory} from "react-router-dom";

const PayToProviderButton = ({provider, className}) => {
    const history = useHistory();
    const onAccept = () => {
        history.push(`/admin/providers/${provider.username}/payouts`);
        return Promise.resolve({ok: 'ok'});
    };

    return <AbstractActionUserButton
        user={provider}
        showAlert={false}
        buttonText="Ir a Pagos Pendientes"
        action={onAccept}
        className={className}
        />;
};

export default PayToProviderButton;
