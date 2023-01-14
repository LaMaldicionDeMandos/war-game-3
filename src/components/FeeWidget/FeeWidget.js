import React, {useEffect, useState} from "react";
import {Card, CardBody, Col, Row} from "reactstrap";
import NotificationAlert from "react-notification-alert";

import variablesService from '../../services/variables.service';
import {Slider} from "@mui/material";



const FeeWidget = () => {
    const notificationAlertRef = React.useRef(null);
    const [fee, setFee] = useState(0);

    useEffect(() => {
        variablesService.fee().then(feeFactor => {
            setFee(factorFunction(feeFactor));
        });
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

    const factorFunction = (factor) => {
        return Math.round((1 - factor) * 100);
    }

    const factorFunctionInverse = (fee) => {
        return 1 - fee * 0.01;
    }

    const onChangeRatio = (r) => {
        if (fee !== r) setFee(r);
    }

    const update = (value) => {
        setFee(value);
        variablesService.updateFee(factorFunctionInverse(value))
          .then(v => {
              showSuccessAlert('La comision ya se modificó 😃');
          })
          .catch(() => showErrorAlert('Ops! 😅 Algo salió mal, volvé a intentarlo cuando alguien lo arregle!'))
    }

    const onEnterHandler = (e) => {
        if (e.key === 'Enter') update(Number.parseInt(e.target.value));
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
                          <p className="card-category">Comision</p>
                          <h3></h3>
                      </div>
                  </Col>
                  <Col md="7">
                      <div className="numbers">
                          <p className="card-category"><br/></p>

                          <h3>{fee}%</h3>
                      </div>
                  </Col>
                  <Col md="12">
                      <Slider aria-label="%"
                              value={fee}
                              onKeyPress={onEnterHandler}
                              onChange={(e, value) => {
                                  onChangeRatio(value);
                              }}
                              valueLabelFormat={(v) => (v + '%')}
                              valueLabelDisplay="off"
                              step={1}
                              min={0}
                              max={100} />
                      <button className="btn btn-primary form-control" onClick={() => update(fee)}>Confirmar</button>
                  </Col>
              </Row>
          </CardBody>
      </Card>
    );
}

export default FeeWidget;
