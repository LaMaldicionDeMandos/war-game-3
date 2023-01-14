import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import * as _ from 'lodash';
import React from "react";

const ClipboardCopy = ({children, textToCopy, onCopy = (t) => console.log('ON COPY STUB ' + t)}) => {
    const StyledChildren = () =>
        React.Children.map(children, child =>
            React.cloneElement(child, {
                className: `${child.props.className} row`,
                children: _.concat(child.props.children, [
                    (<CopyToClipboard text={textToCopy} onCopy={() => onCopy(textToCopy)}>
                        <a data-toggle="tab" className="active nav-link">
                            <i className="zmdi zmdi-copy"></i>
                        </a>
                    </CopyToClipboard>)])
            })
        );
    return <StyledChildren/>;
}

export default ClipboardCopy;
