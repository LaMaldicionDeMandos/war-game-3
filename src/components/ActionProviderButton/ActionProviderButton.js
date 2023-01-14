import React from "react";
import * as _ from "lodash";
import DeleteProviderButton from "../DeleteProviderButton/DeleteProviderButton";
import PayToProviderButton from "../PayToProviderButton/PayToProviderButton";
import ActiveProviderButton from "../ActiveProviderButton/ActiveProviderButton";

const WAITING_STATE = 'waiting';
const PENDING_STATE = 'pending';
const ACTIVE_STATE = 'active';

const getState = (roles) => {
    return _.reduce(roles, (state, role) => {
        if (role === 'PROVIDER') return ACTIVE_STATE;
        if (role === 'PROVIDER_WAITING') return WAITING_STATE;
        if (role === 'PROVIDER_UNAUTHENTICATED') return PENDING_STATE;
        else return state;
    }, WAITING_STATE);
}

const ActionProviderButton = ({provider,
                                  successHandlers = {defaultHandler: () => console.log('Default success STUB')},
                                  errorHandlers = {defaultHandler: () => console.log('Default error STUB')},
                                    className = ''
                            }) => {
    const deleteActionButton = () => (<DeleteProviderButton provider={provider} className={className}
                                                     successHandler={successHandlers.deleteHandler || successHandlers.defaultHandler}
                                                     errorHandler={errorHandlers.deleteHandler || errorHandlers.defaultHandler}/>);
    const activeActionButton = () => (<ActiveProviderButton provider={provider} className={className}
                                                     successHandler={successHandlers.activeHandler || successHandlers.defaultHandler}
                                                     errorHandler={errorHandlers.activeHandler || errorHandlers.defaultHandler}/>);
    const payActionButton = () => (<PayToProviderButton provider={provider} className={className}/>);
    const actionButton = (provider) => {
        const state = getState(provider.roles);
        if (state === PENDING_STATE) return deleteActionButton();
        if (state === WAITING_STATE) return activeActionButton();
        else if (provider.hasApprovals) return payActionButton();
        else return '';
    };

    return actionButton(provider);
};

export default ActionProviderButton;
