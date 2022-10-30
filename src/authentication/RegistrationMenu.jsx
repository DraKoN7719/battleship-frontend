import React, {useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

const RegistrationMenu = function () {
    const [inputUserLogin, setInputUserLogin] = useState("");
    const [inputUserPassword, setInputUserPassword] = useState("");
    const [inputUserPassword2, setInputUserPassword2] = useState("");
    const navigate = useNavigate();
    function createUser() {
        if ((inputUserLogin === undefined || inputUserLogin === "")
            && (inputUserPassword === undefined || inputUserPassword === "")
            && (inputUserPassword2 === undefined || inputUserPassword2 === "")) {
            window.alert("Есть пустые поля");
            return;
        }
        if (inputUserPassword !== inputUserPassword2) {
            window.alert("Пароли не совпадают");
            return;
        }
        axios.put(`http://localhost:8080/api/registration`, {
            "login": inputUserLogin,
            "password": inputUserPassword
        }).then(navigate(`/authorization`))

    }
    return (
        <div className="Authentication">
            <p><input type="text" value={inputUserLogin} placeholder="Введите логин"
                              onChange={(event) => setInputUserLogin(event.target.value)}/></p>
            <p><input type="password" value={inputUserPassword} placeholder="Введите пароль"
                             onChange={(event) => setInputUserPassword(event.target.value)}/></p>
            <p><input type="password" value={inputUserPassword2} placeholder="Повторите пароль"
                             onChange={(event) => setInputUserPassword2(event.target.value)}/></p>
            <p><input type="button" value="Создать" onClick={createUser}/></p>
        </div>
    )
}

export default RegistrationMenu;