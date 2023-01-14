import React, {useEffect, useState} from "react";
import {Card, CardBody, Col, Input, Row} from "reactstrap";
import NotificationAlert from "react-notification-alert";

import variablesService from '../../services/variables.service';

const CreditQuoteWidget = () => {
    const notificationAlertRef = React.useRef(null);
    const [quote, setQuote] = useState();
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        variablesService.creditQuote().then(setQuote);
    }, []);

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

    const showSuccessAlert = (message, place = 'tc') => {
        showAlert(message, 'success', 'icon-check-2');
    }

    const showErrorAlert = (message, place = 'tc') => {
        showAlert(message, 'danger', 'icon-alert-circle-exc');
    }

    const update = async (value) => {
        setQuote(value);
        setEditable(false);
        variablesService.updateCreditQuote(value)
          .then(v => {
              showSuccessAlert('La cotización ya se modificó 😃');
          })
          .catch(() => showErrorAlert('Ops! 😅 Algo salió mal, volvé a intentarlo cuando alguien lo arregle!'));
    }

    const onEnterHandler = (e) => {
        if (e.key === 'Enter') update(e.target.value);
    }

    return (
      <Card>
          <div className="react-notification-alert-container">
              <NotificationAlert ref={notificationAlertRef} />
          </div>
          <CardBody>
              <Row>
                  <Col md="5">
                      <div>
                          <p className="card-category">Cotización</p>
                          <h3>1 Credito</h3>
                      </div>
                  </Col>
                  <Col md="7">
                      <div className="numbers">
                          <p className="card-category"><br/></p>
                          <h3>${editable ? (<Input defaultValue={quote} type="number" onKeyUp={onEnterHandler} style={{width: 100, display: 'inline'}}/>) : quote}<button className="btn-sm btn-link btn-icon btn-simple btn-success" onClick={() => setEditable(!editable)}><i className="zmdi zmdi-edit"></i></button></h3>
                      </div>
                  </Col>
              </Row>
          </CardBody>
      </Card>
    );
}

export default CreditQuoteWidget;
