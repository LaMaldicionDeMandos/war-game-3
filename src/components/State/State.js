import React from "react";

const State = ({state}) => {
    const stateColor = () => {
        if (state === 'waiting') return '#fb6340';
        if (state === 'active') return '#2dce89';
        else return '#6c757d';
    }
    return <span style={{fontSize: 24, color: stateColor(state)}}>•</span>;
}

export default State;
