import React, {useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {authenticationUser} from "../Store/userReducer";
import ModalInfo from "../Modal/ModalInfo";

const AuthorizationMenu = function () {
    const dispatch = useDispatch()
    const [inputUserLogin, setInputUserLogin] = useState("");
    const [inputUserPassword, setInputUserPassword] = useState("");
    const navigate = useNavigate();
    const [modalActive, setModalActive] = useState(false);

    function authorization() {
        axios.post(`http://${window.location.hostname}:8080/api/authorization`, {
            "login": inputUserLogin,
            "password": inputUserPassword
        }).then(res => {
            if (res.data.status === "SUCCESS") {
                getIdUser();
                navigate(`/`)
            } else {
                if (res.data.status === "NOT_FOUND") {
                    alert("Такого пользователя не существует");
                } else if (res.data.status === "INVALID_PASSWORD") {
                    alert("Неверный пароль");
                }
            }
        }).catch((error) => {
            console.error(error.response);
        })
    }

    function getIdUser() {
        axios.get(`http://${window.location.hostname}:8080/api/authentication/${inputUserLogin}`)
            .then(res => {
            if(res.data) {
                dispatch(authenticationUser(res.data.id, inputUserLogin));
                sessionStorage.setItem('user', JSON.stringify({auth: true, id: res.data.id, login: inputUserLogin}))
            }
        }).catch((error) => {
            console.error(error.response);
        })
    }


    return (
        <div className="Authentication" >
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
            <div className="divImg" style={{paddingTop: "7%"}}>
                <img className="Menu_img" src =  {require ('../styles/info.png')} onClick={() => setModalActive(true)}/>
                <ModalInfo modalActive={modalActive} setModalActive={setModalActive}/>
            </div>
        </div>
    )
}

export default AuthorizationMenu;