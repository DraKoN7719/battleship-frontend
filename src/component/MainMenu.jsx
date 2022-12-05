import React from 'react';

import {Link} from 'react-router-dom'
import LoginMenu from "./LoginMenu";
import classes from '../styles/MainMenu.css'



const MainMenu = function () {
    return (
        <div>
            <LoginMenu data ={{name : 'Сергей'}} />
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