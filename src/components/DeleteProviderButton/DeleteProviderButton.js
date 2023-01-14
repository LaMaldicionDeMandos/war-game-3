import React from "react";
import usersService from "../../services/users.service";
import AbstractActionUserButton from "../AbstractActionProviderButton/AbstractActionUserButton";

const DeleteProviderButton = ({provider, className, successHandler = () => console.log('ON SUCCESS STUB'), errorHandler = () => console.log('ON ERROR STUB')}) => {
    const onAccept = () => usersService.deleteProvider(provider);

    return <AbstractActionUserButton user={provider}
                                     className={className}
                                     buttonText="Eliminar"
                                     buttonColor="danger"
                                     alertTitle={`Seguro queres borrar a ${provider.username}?`}
                                     alertButtonText="Se, borralo nomas!"
                                     action={onAccept}
                                     successHandler={successHandler}
                                     errorHandler={errorHandler} />;
};

export default DeleteProviderButton;
