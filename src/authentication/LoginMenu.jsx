import React from 'react';
import classes from '../style/LoginMenu.css'
import {Link} from "react-router-dom";

const LoginMenu = function (props) {
    return (
        <div className={'main'}>
            <img className={'logo'} src =  {require ('../style/chel.png')}/>
            <div className={'Nick'}>{props.data.name}</div>
            <Link to="/authorization">
                <button className={'exitB'}>Выход</button>
            </Link>
        </div>
    )
}
export default LoginMenu;