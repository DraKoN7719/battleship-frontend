import React, {useEffect, useState} from 'react';
import PoleBattle from "./componentBattle/PoleBattle";
import classes from '../styles/PoleBattle.css'
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {renderShipsBattle} from "../component/RenderShips";
import {renderShipsBattleComp} from "../component/RenderShips";
import {renderShipsBattlePlayer} from "../component/RenderShips";
import axios from "axios";
import {checkBounds, setArea} from "./componentBattle/DrawingBorders";


const BattleTheComputer = () => {
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
    const location = useLocation()
    const [polePlayer, setPolePlayer] = useState(location.state);
    let motion2 = true


    const [poleComputer, setPoleComputer] = useState([
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

    const [selectedSquare, setSelectedSquare] = useState({x: null, y: null}) //координаты попадания
    const [selectedComp, setSelectedComp] = useState({x: null, y: null});//координаты выстрела оппонента
    const [motion, setMotion] = useState(true)
    const [vin, setVin] = useState(null)

    let id = 1 //todo айди добавить
    let strat = 2;

    function sendPolePlayer() {
        axios.post(`http://localhost:8080/api/setPolePlayer`,
            {polePlayer, id},
        ).then(res => {
            //todo обработка ошибок мб шо то не сохранилось и тд
        }).catch((error) => {
            console.error(error.response);
        })
    }

    function send() {
        axios.post(`http://localhost:8080/api/shoot`, {
            "x": selectedSquare.y,
            "y": selectedSquare.x
        }).then(res => {
            console.log(res.data)
            if (res.data === 1) console.log('Попал')
            if (res.data === 2) console.log('Убил')
            if (res.data === 0) console.log("мимо");
            if (res.data === 1) {
                const poleComputer2 = poleComputer.slice();
                poleComputer2[selectedSquare.y][selectedSquare.x] = 1;
                setPoleComputer(poleComputer2);
            } else if (res.data === 0) {
                const poleComputer2 = poleComputer.slice();
                poleComputer2[selectedSquare.y][selectedSquare.x] = 2;
                setPoleComputer(poleComputer2);
                motion2 = false;
                setMotion(motion => false)
            } else if (res.data === 2) {
                const poleComputer2 = poleComputer.slice();
                poleComputer2[selectedSquare.y][selectedSquare.x] = 1;
                setArea(selectedSquare.y, selectedSquare.x, poleComputer2)
                setPoleComputer(poleComputer2);
            } else if (res.data === 3) {
                const poleComputer2 = poleComputer.slice();
                poleComputer2[selectedSquare.y][selectedSquare.x] = 1;
                setPoleComputer(poleComputer2);
                setVin(false)
            }
            compTurn()

        }).catch((error) => {
            console.error(error.response);
        })

    }

    function getCompTurn() {
        axios.post(`http://localhost:8080/api/shootComp`, {id, strat}).then(res => {
            let x = res.data.x;
            let y = res.data.y;

            const polePlayer2 = polePlayer.slice();
            if (polePlayer2[x][y] === 1) {
                polePlayer2[x][y] = -1;
                if (isDead(polePlayer2, x, y)) setArea(x, y, polePlayer2)
                setPolePlayer(polePlayer2);
            }

            if (polePlayer2[x][y] === 0) {
                motion2 = true;
                setMotion(motion => true)
                polePlayer2[x][y] = 2;
            }
            setPolePlayer(polePlayer2);
            sleep(500)
            if (motion2 === false) getCompTurn()
            else setMotion(motion2)

            if (isCompWin(polePlayer2)) {
                setMotion(motion => false)
                setVin(true)
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


    function isDead(pole, x, y) {
        let n = 1;
        while (checkBounds(x + n, y) && pole[x + n][y] === -1) {
            n++;
        }
        if (checkBounds(x + n, y) && pole[x + n][y] === 1) return false;
        n = 1;

        while (checkBounds(x - n, y) && pole[x - n][y] === -1) {
            n++;
        }
        if (checkBounds(x - n, y) && pole[x - n][y] === 1) return false;
        n = 1;

        while (checkBounds(x, y + n) && pole[x][y + n] === -1) {
            n++;
        }
        if (checkBounds(x, y + n) && pole[x][y + n] === 1) return false;
        n = 1;

        while (checkBounds(x, y - n) && pole[x][y - n] === -1) {
            n++;
        }
        if (checkBounds(x, y - n) && pole[x][y - n] === 1) return false;
        return true;
    }



    useEffect(() => {
        if (selectedSquare.x !== null && poleComputer[selectedSquare.y][selectedSquare.x] !== 1 && poleComputer[selectedSquare.y][selectedSquare.x] !== 2 && poleComputer[selectedSquare.y][selectedSquare.x] !== -1) {
            if (motion === true)
                send();
        } else {
            if (selectedSquare.x == null) {
                const polePlayer2 = polePlayer.slice();
                for (let i = 0; i < 10; i++)
                    for (let j = 0; j < 10; j++)
                        if (polePlayer2[i][j] >= 2) polePlayer2[i][j] = 0;
                setPolePlayer(polePlayer2)
                sendPolePlayer()
            }
        }
    }, [selectedSquare]);

    function compTurn() {
        if (motion2 === false)
            getCompTurn()
    }

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    useEffect(() => {
        renderShipsBattle(polePlayer)
    }, [polePlayer]);

    useEffect(() => {
        if (vin === true)
            alert("Вы проиграли")
        if (vin === false)
            alert("Вы выйграли")
    }, [vin]);

    useEffect(() => {
        renderShipsBattleComp(poleComputer)
    }, [poleComputer]);


    return (
        <div>
            <div className='poleBattle'>
                <div>
                    <PoleBattle numbers={numbers} letters={letters} isPolePlayer={true}/>
                    <label style={{display: 'flex', justifyContent: 'center', marginTop: '20px', fontSize: '20px'}}>Ваше
                        поле</label>
                </div>
                <div className='lineBattle'/>
                <div className={motion ? 'arrow arrow-right' : 'arrow arrow-left'}/>
                <div>
                    <PoleBattle numbers={numbers} letters={letters} setSelectedSquare={setSelectedSquare}
                                motion={motion} isPolePlayer={false}/>
                    <label style={{display: 'flex', justifyContent: 'center', marginTop: '20px', fontSize: '20px'}}>Поле
                        противника</label>
                </div>

            </div>
        </div>
    );
};

export default BattleTheComputer;