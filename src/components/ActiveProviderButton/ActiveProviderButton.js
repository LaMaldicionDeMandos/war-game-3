import React from "react";
import usersService from "../../services/users.service";
import AbstractActionUserButton from "../AbstractActionProviderButton/AbstractActionUserButton";

const ActiveProviderButton = ({provider, className, successHandler = () => console.log('ON SUCCESS STUB'), errorHandler = () => console.log('ON ERROR STUB')}) => {
    const onAccept = () => usersService.activeProvider(provider);

    return <AbstractActionUserButton
            user={provider}
            className={className}
            buttonText="Activar"
            buttonColor="info"
            alertTitle={`Seguro queres activar a ${provider.username}?`}
            alertButtonText="Se, activalo nomas!"
            action={onAccept}
            successHandler={successHandler}
            errorHandler={errorHandler}/>;
};

export default ActiveProviderButton;
