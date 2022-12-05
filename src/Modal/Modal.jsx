import React from 'react';
import classes from '../styles/modal.css'
import {Link} from "react-router-dom";

const Modal = (props) => {
    return (
        <div className={props.active ? 'modal active' : 'modal'} onClick={() => props.setActive(false)}>
            <div className={props.style} onClick={e => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
};
export default Modal;