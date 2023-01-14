/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect, useState} from "react";

// reactstrap components
import {
  Row,
  Col
} from "reactstrap";
import NotificationAlert from "react-notification-alert";
import SendMessageForm from "../components/SendMessageForm/SendMessageForm";
import MessageList from "../components/MessageList/MessageList";
import messagesService from "../services/messages.service";
import * as _ from "lodash";

const Messages = () => {
  const notificationAlertRef = React.useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    findMessages();
  }, []);

  const findMessages = () => {
    messagesService.messages()
        .then(messages => _.orderBy(messages, ['createdAt'], ['desc']))
        .then(setMessages);
  }

  const showAlert = (message, type = 'info', icon = '', place = 'tc') => {
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
    notificationAlertRef.current.notificationAlert(options);
  }

  const showErrorAlert = (message, place = 'tc') => {
    showAlert(message, 'danger', 'icon-alert-circle-exc');
  }

  const showSuccessAlert = (message, place = 'tc') => {
    showAlert(message, 'success', 'icon-check-2');
  }

  const sendMessageSuccessHandler = (m) => {
    showSuccessAlert('El mensaje ya fue enviado!');
    setMessages(_.concat([m], messages));
  }

  return (
      <>
        <div className="content">
          <div className="react-notification-alert-container">
            <NotificationAlert ref={notificationAlertRef} />
          </div>
          <Row>
            <Col md="6">
              <SendMessageForm onSuccess={(m) => sendMessageSuccessHandler(m)} onError={() => showErrorAlert('Ops! 😅 Algo salió mal, volvé a intentarlo cuando alguien lo arregle!')}></SendMessageForm>
            </Col>
            <Col md="6">
              <MessageList messages={messages} />
            </Col>
          </Row>
        </div>
      </>
  );
}

export default Messages;
