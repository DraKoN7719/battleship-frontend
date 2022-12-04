import React, {useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import classes from "../style/Authentication.css";

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
            <p><input style={{borderRadius: '20px', width: '280px', height: '40px', marginLeft: 'auto', paddingLeft: '18px', fontSize: '20px'}}
                      type="text" value={inputUserLogin} placeholder="Введите логин" maxLength={12}
                              onChange={(event) => setInputUserLogin(event.target.value)}/></p>
            <p><input style={{borderRadius: '20px', width: '280px', height: '40px', marginLeft: 'auto', paddingLeft: '18px', fontSize: '20px'}}
                      type="password" value={inputUserPassword} placeholder="Введите пароль" maxLength={12}
                             onChange={(event) => setInputUserPassword(event.target.value)}/></p>
            <p><input style={{borderRadius: '20px', width: '280px', height: '40px',  marginLeft: 'auto', paddingLeft: '18px', fontSize: '20px'}}
                      type="password" value={inputUserPassword2} placeholder="Повторите пароль" maxLength={12}
                             onChange={(event) => setInputUserPassword2(event.target.value)}/></p>
            <p><input className='registration_button' type="button" value="Зарегистрироваться" onClick={createUser}/></p>
        </div>
    )
}

export default RegistrationMenu;