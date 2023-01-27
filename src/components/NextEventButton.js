import React, {useEffect} from "react";
import worldService from '../services/world.service';
import {Button} from "reactstrap";

function NextEventButton() {

  const onNext = () => {
    console.log("Next Event");
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
