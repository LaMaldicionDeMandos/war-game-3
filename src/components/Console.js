import React from "react";
import {Input} from "reactstrap";

import _console from '../context/console';
import {Alert, showSuccess, showError} from "./Alert";
import {useGlobalState, MAP_CENTER} from "../contexts/GlobalState";

function Console() {
  const notificationAlertRef = React.useRef(null);

  const [center] = useGlobalState(MAP_CENTER);

  const onEnter = (target) => {
    if(target.charCode === 13){
      _console.execute(target.currentTarget.value, center)
        .then(() => showSuccess(notificationAlertRef, "Success!"))
        .catch((e) => showError(notificationAlertRef, e));
      target.currentTarget.value = '';
    }
  }
  return (
    <div className="content">
      <Alert notificationAlertRef={notificationAlertRef} />
      <Input className="console" onKeyPress={onEnter}/>
    </div>
  );
}

export default Console;
