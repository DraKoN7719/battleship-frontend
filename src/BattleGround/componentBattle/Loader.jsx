import React from 'react';
import classes from "../../styles/Loader.css"
import {Link} from "react-router-dom";

const Loader = ({polePlayer,isWaitPlayer}) => {
    return (
        <div className={!isWaitPlayer ? "modal_loader": "modal_loader active"}>
            <div className="loader">
            </div>
            <h1 style={{marginTop: '50px'}}>Ожидание игрока...</h1>
            <Link  to="/lobbyOnlineGame" state={polePlayer} className='button_back_loader'>Назад</Link>
        </div>
    );
};

export default Loader;