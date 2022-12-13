import React from 'react';
import classes from '../styles/LoginMenu.css'
import {Link} from "react-router-dom";
import {logoutUser} from "../Store/userReducer";
import {useDispatch} from "react-redux";

const LoginMenu = function (props) {
    const dispatch = useDispatch()

    function logout() {
        dispatch(logoutUser());
        sessionStorage.removeItem('user')
    }

    return (
        <div className={'main'}>
            <img className={'logo'} src =  {require ('../styles/chel.png')}/>
            <div className={'Nick'}>{props.data.name}</div>
            <Link to="/authorization">
                <button className={'exitB'} onClick={logout}>Выход</button>
            </Link>
        </div>
    )
}
export default LoginMenu;