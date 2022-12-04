import React, {useState} from 'react';
import axios from "axios";
import {Link, useLocation, useNavigate} from "react-router-dom";
import classes from "../style/Authentication.css";
import RegistrationMenu from "./RegistrationMenu";

const AuthorizationMenu = function () {
    const [inputUserLogin, setInputUserLogin] = useState("");
    const [inputUserPassword, setInputUserPassword] = useState("");
    const navigate = useNavigate();

    function authorization() {

        axios.post(`http://localhost:8080/api/authorization`, {
            "login": inputUserLogin,
            "password": inputUserPassword
        }).then(res => {
            if(res.data) navigate(`/`) //передать props
                else window.alert("Такого пользователя не существует");
        }).catch((error) => {
            console.error(error.response);
        })
    }
    return (
        <div className="Authentication">
            <p><input style={{borderRadius: '20px', width: '280px', height: '40px', marginLeft: 'auto', paddingLeft: '18px', fontSize: '20px'}}
                      type="text" value={inputUserLogin} placeholder="Введите логин"
                      maxLength={12}
                      onChange={(event) => setInputUserLogin(event.target.value)}/></p>
            <p><input style={{borderRadius: '20px', width: '280px', height: '40px', marginLeft: 'auto', paddingLeft: '18px', fontSize: '20px'}}
                      type="password" value={inputUserPassword} placeholder="Введите пароль"
                      maxLength={12}
                      onChange={(event) => setInputUserPassword(event.target.value)}/></p>
            <p><input className='registration_button' style={{width: '140px'}} type="button" value="Войти" onClick={authorization}/></p>
            <p><Link to="/registration" className={'registration_menu'}>
                Зарегистрироваться
            </Link>
            </p>
        </div>
    )
}

export default AuthorizationMenu;