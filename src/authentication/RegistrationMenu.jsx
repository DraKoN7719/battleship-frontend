import React, {useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import classes from "../styles/Authentication.css";
import ModalInfo from "../Modal/ModalInfo";

const RegistrationMenu = function () {
    const [inputUserLogin, setInputUserLogin] = useState("");
    const [inputUserPassword, setInputUserPassword] = useState("");
    const [inputUserPassword2, setInputUserPassword2] = useState("");
    const navigate = useNavigate();
    const [modalActive, setModalActive] = useState(false);
    function createUser() {
        if ((inputUserLogin === undefined || inputUserLogin === "")
            && (inputUserPassword === undefined || inputUserPassword === "")
            && (inputUserPassword2 === undefined || inputUserPassword2 === "")) {
            alert("Есть пустые поля");
            return;
        }
        if (inputUserLogin.length < 2) {
            alert("Минимальная длина логина 2 символа");
            return;
        } else if (inputUserLogin.length > 12) {
            alert("Максимальная длина логина 12 символов");
            return;
        }
        if (inputUserPassword.length < 4) {
            alert("Минимальная длина пароля 4 символа");
            return;
        } else if (inputUserLogin.length > 12) {
            alert("Максимальная длина пароля 12 символов");
            return;
        }
        if (inputUserPassword !== inputUserPassword2) {
            alert("Пароли не совпадают");
            return;
        }
        axios.put(`http://${window.location.hostname}:8080/api/registration`, {
            "login": inputUserLogin,
            "password": inputUserPassword
        }).then(res => {
            if (res.data.status === "SUCCESS") {
                navigate(`/authorization`);
            } else if (res.data.status === "INVALID_LOGIN") {
                alert("Пользователь с таким логином уже существует");
            } else if(res.data.status === "INVALID_LOGIN_REGISTRATION") {
                alert("Невозможно создать пользователя с таким логином");
            }
        }).catch((error) => {
            console.error(error.response);
        })

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
            <div className="divImg" style={{paddingTop: "7%"}}>
                <img className="Menu_img" src =  {require ('../styles/info.png')} onClick={() => setModalActive(true)}/>
                <ModalInfo modalActive={modalActive} setModalActive={setModalActive}/>
            </div>
        </div>
    )
}

export default RegistrationMenu;