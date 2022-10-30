import React from 'react';
import classes from '../style/LoginMenu.css'

const LoginMenu = function (props) {
    return (
        <div className={'main'}>
            <img className={'logo'} src =  {require ('../style/chel.png')}/>
            <div className={'Nick'}>{props.data.name}</div>
            <button className={'exitB'}>Выход</button>
        </div>
    )
}
export default LoginMenu;