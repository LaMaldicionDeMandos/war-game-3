import React from "react";
import worldService from '../services/world.service';
import {Button} from "reactstrap";

import {CURRENT_EVENT, setGlobalState} from "../contexts/GlobalState";

function NextEventButton() {

  const onNext = () => {
    worldService.getNextEvent()
      .then(ev => {
        setGlobalState(CURRENT_EVENT, () => ev);
      })
  }

  return (
    <div className="collapse navbar-collapse">
      <div className="ml-auto navbar-nav">
        <Button className="btn btn-lg btn-primary" onClick={onNext}>
          Siguente Evento
          <i className="tim-icons icon-minimal-right" />
        </Button>
      </div>
    </div>
  );
}

export default NextEventButton;
