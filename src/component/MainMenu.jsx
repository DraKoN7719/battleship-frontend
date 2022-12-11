import React from 'react';

import {Link} from 'react-router-dom'
import LoginMenu from "../authentication/LoginMenu";
import classes from '../style/MainMenu.css'
import {useSelector} from "react-redux";



const MainMenu = function () {
    const loginUser = useSelector(state => state.user.login)


    return (
        <div>
            <LoginMenu data ={{name : loginUser}} />
            <div className={'MainMenu'}>
                <Link  to="/PrepareForBattle" className={'MenuText'}>
                   Играть онлайн
                </Link>
                <Link to="/PrepareForBattle" className={'MenuText'}>
                   Играть с компьютером
                </Link>
                <Link to="/PrepareForBattle" className={'MenuText'}>
                   Мои расстановки
                </Link>
                <Link to="/PrepareForBattle" className={'MenuText'} >
                   История игр
                </Link>
            </div>
        </div>
    )
}
export default MainMenu;