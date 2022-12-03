import React from 'react';
import classes from '../styles/modal.css'
import {Link} from "react-router-dom";

const Modal = ({active, setActive, coordinates}) => {
    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className='modal__content' onClick={e => e.stopPropagation()}>
                <Link  to="/battleTheComputer" state={coordinates} className='modal__content__button'>Легкий</Link>
                <Link  to="/battleTheComputer" state={coordinates} className='modal__content__button'>Средний</Link>
                <Link  to="/battleTheComputer" state={coordinates} className='modal__content__button'>Сложный</Link>
            </div>
        </div>
    );
};

export default Modal;