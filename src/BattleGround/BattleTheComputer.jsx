import React, {useEffect, useState} from 'react';
import PoleBattle from "./componentBattle/PoleBattle";
import {useLocation, useNavigate} from 'react-router-dom';
import {renderShipsBattle} from "../component/RenderShips";
import {renderShipsBattleComp} from "../component/RenderShips";
import axios from "axios";
import useSound from 'use-sound';
import boopSfx from './vistrel.mp3';
import {isDead, setArea, setDead} from "./componentBattle/DrawingBorders";
import Timer from "./componentBattle/Timer";
import Audio from "./componentBattle/Audio";

const BattleTheComputer = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [play] = useSound(boopSfx);

    const idUser = JSON.parse(sessionStorage.getItem('user')).id;
    const bot = location.state.bot;
    let motion = location.state.motion ? location.state.motion === idUser : true;
    let id = location.state.id;

    const [nameSave, setNameSave] = useState("");
    const [timer, setTimer] = useState(120);
    const [startTimer, setStartTimer] = useState(true);
    const [isAudio, setIsAudio] = useState(true);

    const [isLoad, setIsLoad] = useState(!!location.state.isLoad);
    const [arrow, setArrow] = useState(location.state.motion ? location.state.motion === idUser : true)
    const [win, setWin] = useState(null)

    const [selectedSquare, setSelectedSquare] = useState({x: null, y: null}) //координаты попадания
    const [polePlayer, setPolePlayer] = useState(location.state.field);
    const [poleComputer, setPoleComputer] = useState(location.state.botField ? location.state.botField : [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);

    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];

    function setMotion(change) {
        motion = change;
        setArrow(change)
    }

    function sendPolePlayer() {
        axios.post(`http://${window.location.hostname}:8080/api/initialize-battle`,
            {
                "id": id,
                "player1": idUser,
                "player2": bot,
                "fieldPlayer1": polePlayer,
                "fieldPlayer2": null,
                "turn": idUser
            },
        ).then(res => {
            //todo обработка ошибок мб шо то не сохранилось и тд
        }).catch((error) => {
            console.error(error.response);
        })
    }

    function send() {
        if (isAudio) {
            play()
        }

        axios.post(`http://${window.location.hostname}:8080/api/shoot`, {
            "gameId": id,
            "shotAt": bot,
            "coordinate": {
                "x": selectedSquare.y,
                "y": selectedSquare.x
            }
        }).then(res => {
            setTimer(120);
            if (res.data === 1) console.log('Попал')
            if (res.data === 2) console.log('Убил')
            if (res.data === 0) console.log("мимо");
            if (res.data === 1) {
                const poleComputer2 = poleComputer.slice();
                poleComputer2[selectedSquare.y][selectedSquare.x] = 2;
                setPoleComputer(poleComputer2);
            } else if (res.data === 0) {
                const poleComputer2 = poleComputer.slice();
                poleComputer2[selectedSquare.y][selectedSquare.x] = -1;
                setPoleComputer(poleComputer2);
                setMotion(false);
            } else if (res.data === 2) {
                const poleComputer2 = poleComputer.slice();
                poleComputer2[selectedSquare.y][selectedSquare.x] = 3;
                setDead(poleComputer2, selectedSquare.y, selectedSquare.x);
                setArea(selectedSquare.y, selectedSquare.x, poleComputer2);
                setPoleComputer(poleComputer2);
            } else if (res.data === 3) {
                const poleComputer2 = poleComputer.slice();
                poleComputer2[selectedSquare.y][selectedSquare.x] = 3;
                setDead(poleComputer2, selectedSquare.y, selectedSquare.x);
                setArea(selectedSquare.y, selectedSquare.x, poleComputer2)
                setPoleComputer(poleComputer2);
                setStartTimer(false);
                setTimeout(() => setWin(false), 100);
            }
            if (win !== undefined) {
                compTurn()
            }
        }).catch((error) => {
            console.error(error.response);
        })
    }

    function compTurn() {
        if (!motion) {
            getCompTurn();
        }
    }

    function getCompTurn() {
        axios.get(`http://${window.location.hostname}:8080/api/shootComp/` + id).then(res => {
            let x = res.data.x;
            let y = res.data.y;

            const polePlayer2 = polePlayer.slice();
            if (polePlayer2[x][y] === 1) {
                polePlayer2[x][y] = 2;
                if (isDead(polePlayer2, x, y)) {
                    setDead(polePlayer2, x, y);
                    setArea(x, y, polePlayer2);
                }
                setPolePlayer(polePlayer2);
            }

            if (polePlayer2[x][y] === 0) {
                setMotion(true);
                polePlayer2[x][y] = -1;
            }
            setPolePlayer(polePlayer2);
            sleep(300)
            if (!motion) {
                getCompTurn();
            }
            if (isAudio) {
                play()
            }
            if (isCompWin(polePlayer2)) {
                setMotion(false);
                setWin(true);
                setStartTimer(false);
            }
        }).catch((error) => {
            console.error(error.response);
        })

    }

    function isCompWin(pole) {
        for (let i = 0; i < 10; i++)
            for (let j = 0; j < 10; j++)
                if (pole[i][j] === 1) return false;
        return true;
    }

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    function endGame() {
        axios.post(`http://${window.location.hostname}:8080/api/history-game/save`, {
            id: id,
            player1: idUser,
            player2: bot,
            result: win ? bot : idUser
        }).then(() => navigate(`/`));
    }

    useEffect(() => {
        if (isLoad) {
            if (!motion) {
                compTurn();
            }
            setIsLoad(false);
            return;
        }
        if (selectedSquare.x !== null
            && poleComputer[selectedSquare.y][selectedSquare.x] !== 1
            && poleComputer[selectedSquare.y][selectedSquare.x] !== 2
            && poleComputer[selectedSquare.y][selectedSquare.x] !== 3
            && poleComputer[selectedSquare.y][selectedSquare.x] !== -1) {
            if (motion) {
                send();
            } else {
                compTurn();
            }
        } else {
            if (selectedSquare.x == null) {
                sendPolePlayer();
            }
        }
    }, [selectedSquare]);

    useEffect(() => {
        renderShipsBattle(polePlayer);
    }, [polePlayer]);

    useEffect(() => {
        if (win === true) {
            endGame();
            alert(timer === 0 ? "Время закончилось, вы проиграли" : "Вы проиграли");
        } else if (win === false) {
            endGame();
            alert("Вы победили");
        }
    }, [win]);

    useEffect(() => {
        renderShipsBattleComp(poleComputer)
    }, [poleComputer]);

    useEffect(() => {
        if (timer === 0) {
            setWin(true);
        }
    }, [timer])

    function saveGame() {
        if (nameSave !== "") {
            axios.post(`http://${window.location.hostname}:8080/api/saved-game?isOverwrite=false`, {
                "id": id,
                "gameName": nameSave,
                "userId": idUser,
                "botId": bot,
                "userField": polePlayer,
                "botField": null,
                "turn": motion ? idUser : bot
            }).then(
                res => {
                    if (res.data) {
                        if (window.confirm("Игра с таким именем уже существует, вы действительно хотите перезаписать?")) {
                            axios.post(`http://${window.location.hostname}:8080/api/saved-game?isOverwrite=true`, {
                                "id": id,
                                "gameName": nameSave,
                                "userId": idUser,
                                "botId": bot,
                                "userField": polePlayer,
                                "botField": null,
                                "turn": motion ? idUser : bot
                            }).then(
                                res => {
                                    if (!res.data) {
                                        alert("Игра сохранена");
                                        document.getElementById("nameSave").value = "";
                                        setNameSave("");
                                    }

                                })
                                .catch((error) => {
                                    alert("Что-то пошло не так");
                                    console.error(error.response);
                                })
                        }
                    } else {
                        alert("Игра сохранена");
                        document.getElementById("nameSave").value = "";
                        setNameSave("");
                    }
                })
                .catch((error) => {
                    alert("Что-то пошло не так");
                    console.error(error.response);
                })
        } else {
            alert("Название игры для сохранения не может быть пустым!")
        }
    }

    function getNameBot() {
        switch (bot) {
            case 1:
                return "Лёгкий ИИ";
            case 2:
                return "Средний ИИ";
            case 3:
                return "Сложный ИИ";
        }
    }

    return (
        <div>
            <Timer start={startTimer} timer={timer} setTimer={setTimer}/>
            <Audio setAudio={setIsAudio}/>
            <div className='poleBattle'>
                <div>
                    <PoleBattle numbers={numbers} letters={letters} isPolePlayer={true}/>
                    <label style={{display: 'flex', justifyContent: 'center', marginTop: '20px', fontSize: '20px'}}>Ваше
                        поле</label>
                </div>
                <div className='lineBattle'/>
                <div className={arrow ? 'arrow arrow-right' : 'arrow arrow-left'}/>
                <div>
                    <PoleBattle numbers={numbers} letters={letters} setSelectedSquare={setSelectedSquare}
                                motion={motion} isPolePlayer={false}/>
                    <label style={{display: 'flex', justifyContent: 'center', marginTop: '20px', fontSize: '20px'}}>Поле
                        противника {getNameBot()}</label>
                </div>
            </div>
            <div className='save'>
                <input id='nameSave' maxLength={25} placeholder='Название сохранения'
                       style={{
                           borderRadius: '20px',
                           width: '280px',
                           paddingLeft: '18px',
                           fontSize: '20px'
                       }}
                       onChange={(e) => setNameSave(e.target.value)}/>
                <button onClick={(e) => saveGame(e)}
                        className='saveAndLoad_button'
                        style={{marginLeft: "30px"}}>Сохранить
                </button>
            </div>
        </div>
    );
};

export default BattleTheComputer;