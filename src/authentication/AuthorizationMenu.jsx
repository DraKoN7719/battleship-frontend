import React, {useState} from 'react';
import axios from "axios";
import {Link, useLocation, useNavigate} from "react-router-dom";
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
            <p><input type="text" value={inputUserLogin} placeholder="Введите логин"
                      onChange={(event) => setInputUserLogin(event.target.value)}/></p>
            <p><input type="password" value={inputUserPassword} placeholder="Введите пароль"
                      onChange={(event) => setInputUserPassword(event.target.value)}/></p>
            <p><input type="button" value="Войти" onClick={authorization}/></p>
            <p><Link to="/registration" className={'RegistrationMenu'}>
                Зарегистрироваться
            </Link>
            </p>
        </div>
    )
}

export default AuthorizationMenu;