import React, {useState} from 'react';

import {Link} from 'react-router-dom'
import LoginMenu from "../authentication/LoginMenu";
import classes from '../styles/MainMenu.css'
import {useSelector} from "react-redux";
import Modal from "../Modal/Modal";
import ModalInfo from "../Modal/ModalInfo";



const MainMenu = function () {
    const loginUser = useSelector(state => state.user.login)
    const [modalActive, setModalActive] = useState(false);


    return (
        <div>
            <LoginMenu data ={{name : loginUser}} />
            <h1 className="h1">Морской бой</h1>
            <div className={'MainMenu'}>
                <Link  to="/PrepareForBattle" state={true} className={'MenuText'}>
                   Играть онлайн
                </Link>
                <Link to="/PrepareForBattle" state={false} className={'MenuText'}>
                   Играть с компьютером
                </Link>
                <Link to="/listUserPlacement" className={'MenuText'}>
                   Мои расстановки
                </Link>
                <Link to="/loadGame" className={'MenuText'} >
                    Сохраненные игры
                </Link>
                <Link to="/historyGame" className={'MenuText'} >
                   История игр
                </Link>
            </div>
            <div className="divImg">
                <img className="Menu_img" src =  {require ('../styles/info.png')} onClick={() => setModalActive(true)}/>
                <ModalInfo modalActive={modalActive} setModalActive={setModalActive}/>
            </div>

        </div>
    )
}
export default MainMenu;