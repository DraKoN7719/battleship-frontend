import React from 'react';

import {Link} from 'react-router-dom'
import LoginMenu from "../authentication/LoginMenu";
import classes from '../styles/MainMenu.css'
import {useSelector} from "react-redux";



const MainMenu = function () {
    const loginUser = useSelector(state => state.user.login)


    return (
        <div>
            <LoginMenu data ={{name : loginUser}} />
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
        </div>
    )
}
export default MainMenu;