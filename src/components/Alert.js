import NotificationAlert from "react-notification-alert";
import React from "react";

const Alert = ({notificationAlertRef}) => {
  return (
    <div className="react-notification-alert-container">
      <NotificationAlert ref={notificationAlertRef} />
    </div>);
}

const showAlert = (message, type = 'info', icon = '', place = 'tc', ref) => {
  const options = {
    place: place,
    message: (
      <div>
        <div>
          {message}
        </div>
      </div>
    ),
    type: type,
    icon: `tim-icons ${icon}`,
    autoDismiss: 7,
  };
  ref.current.notificationAlert(options);
}

const showSuccess = (ref, message, place = 'tc') => {
  showAlert(message, 'success', 'icon-check-2', place, ref);
}

const showError = (ref, message, place = 'tc') => {
  showAlert(message, 'danger', 'icon-alert-circle-exc', place, ref);
}

export {Alert, showSuccess, showError};
