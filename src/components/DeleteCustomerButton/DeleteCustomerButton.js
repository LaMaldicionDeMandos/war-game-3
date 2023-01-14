import React from "react";
import usersService from "../../services/users.service";
import AbstractActionButton from "../AbstractActionProviderButton/AbstractActionUserButton";

const DeleteCustomerButton = ({customer, className, successHandler = () => console.log('ON SUCCESS STUB'), errorHandler = () => console.log('ON ERROR STUB')}) => {
    const onAccept = () => usersService.deleteCustomer(customer);

    return <AbstractActionButton user={customer}
                                 className={className}
                                 buttonText="Eliminar"
                                 buttonColor="danger"
                                 alertTitle={`Seguro queres borrar a ${customer.username}?`}
                                 alertButtonText="Se, borralo nomas!"
                                 action={onAccept}
                                 successHandler={successHandler}
                                 errorHandler={errorHandler} />;
};

export default DeleteCustomerButton;
