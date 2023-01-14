import React, {useState} from "react";
import {Button} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";

const AbstractActionUserButton = ({
                                  user: user,
                                  className,
                                  showAlert = true,
                                  buttonText,
                                  buttonColor = 'primary',
                                  alertTitle,
                                  alertButtonText,
                                  action = () => console.log(`Stub action with ${user.username}`),
                                  successHandler = () => console.log('ON SUCCESS STUB'),
                                  errorHandler = () => console.log('ON ERROR STUB')}) => {
    const [alertIsOpened, setAlertIsOpened] = useState();

    const doAction = () => {
        setAlertIsOpened(false);
        action(user).then(successHandler).catch(errorHandler);
    }

    const handleButton = () => {
        if (showAlert) {
            setAlertIsOpened(true);
        } else {
            doAction();
        }
    }

    return (
        <>
            {alertIsOpened ? <SweetAlert
                warning
                showCancel
                title={alertTitle}
                confirmBtnText={alertButtonText}
                confirmBtnBsStyle="primary"
                cancelBtnBsStyle="secondary"
                onConfirm={doAction}
                onCancel={() => setAlertIsOpened(false)}
            >
            </SweetAlert> : ''}
            <Button
                className={'btn-fill ' + className}
                color={buttonColor} type="button" onClick={handleButton}>{buttonText}</Button>
        </>
    );
};

export default AbstractActionUserButton;
