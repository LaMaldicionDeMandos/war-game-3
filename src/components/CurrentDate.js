import React, {useEffect} from "react";
import {useGlobalState, setGlobalState, CURRENT_DATE} from "../contexts/GlobalState";
import worldService from '../services/world.service';

function CurrentDate() {

  const [currentDate] = useGlobalState(CURRENT_DATE);

  useEffect(() => {
    worldService.getCurrentDate()
      .then(date => setGlobalState(CURRENT_DATE, (c) => date))
      .catch(e => console.error(JSON.stringify(e)));
  });

  return (
    <div className="collapse navbar-collapse">
      <div className="ml-auto navbar-nav">
        <h4>Fecha: {currentDate}</h4>
      </div>
    </div>
  );
}

export default CurrentDate;
