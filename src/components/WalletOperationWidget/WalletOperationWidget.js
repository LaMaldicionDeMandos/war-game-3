import React from "react";

const WalletOperationWidget = ({operation}) => {
    const cashIn = () => (<>
        <i className="zmdi zmdi-money zmdi-hc-2x" style={{margin: 5}}></i>
        <i className="zmdi zmdi-arrow-right zmdi-hc-2x" style={{margin: 5}}></i>
        <i className="zmdi zmdi-balance-wallet zmdi-hc-2x" style={{margin: 5}}></i>
        <div>Compra de Creditos</div>
    </>);

    const cashOut = () => (<>
        <i className="zmdi zmdi-balance-wallet zmdi-hc-2x" style={{margin: 5}}></i>
        <i className="zmdi zmdi-arrow-right zmdi-hc-2x" style={{margin: 5}}></i>
        <i className="zmdi zmdi zmdi-close zmdi-hc-2x" style={{margin: 5}}></i>
        <div>Retiro de Creditos</div>
    </>);

    const expire = () => (<>
        <i className="zmdi zmdi zmdi-close zmdi-hc-2x" style={{margin: 5}}></i>
        <div>Creditos expirados</div>
    </>);

    const reserve = () => (<>
        <i className="zmdi zmdi-balance-wallet zmdi-hc-2x" style={{margin: 5}}></i>
        <i className="zmdi zmdi-arrow-right zmdi-hc-2x" style={{margin: 5}}></i>
        <i className="zmdi zmdi-lock zmdi-hc-2x" style={{margin: 5}}></i>
        <div>Reserva Creditos</div>
    </>);

    const cancelReserve = () => (<>
        <i className="zmdi zmdi-lock zmdi-hc-2x" style={{margin: 5}}></i>
        <i className="zmdi zmdi-arrow-right zmdi-hc-2x" style={{margin: 5}}></i>
        <i className="zmdi zmdi-balance-wallet zmdi-hc-2x" style={{margin: 5}}></i>
        <div>Se cancela reserva</div>
    </>);

    const cashFromReserved = () => (<>
        <i className="zmdi zmdi zmdi-lock zmdi-hc-2x" style={{margin: 5}}></i>
        <i className="zmdi zmdi-arrow-right zmdi-hc-2x" style={{margin: 5}}></i>
        <i className="zmdi zmdi zmdi-close zmdi-hc-2x" style={{margin: 5}}></i>
        <div>Cobro de Creditos</div>
    </>);
    const OP = {
        'cash-in': cashIn,
        'cash-out': cashOut,
        'reserve': reserve,
        'cash-out-from-reserved': cashFromReserved,
        'cancel-reserve': cancelReserve,
        'expire': expire
    };

    return OP[operation] ? OP[operation]() : '';
}

export default WalletOperationWidget;
