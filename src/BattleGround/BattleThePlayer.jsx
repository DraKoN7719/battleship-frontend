import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {renderShipsBattle, renderShipsBattleComp} from "../component/RenderShips";
import PoleBattle from "./componentBattle/PoleBattle";
import {useDispatch, useSelector} from "react-redux";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import Loader from "./componentBattle/Loader";
import {joinUser} from "../Store/STOMPReducer";
import {setArea, setDead} from "./componentBattle/DrawingBorders";
import axios from "axios";
import Timer from "./componentBattle/Timer";
import Audio from "./componentBattle/Audio";

let stompClient = null;
const BattleThePlayer = () => {
    const params = useParams();
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [polePlayer, setPolePlayer] = useState(() => {
        const polePlayer2 = location.state.coordinates;
        for (let i = 0; i < 10; i++)
            for (let j = 0; j < 10; j++)
                if (polePlayer2[i][j] >= 2) polePlayer2[i][j] = 0;
        return polePlayer2
    });
    const idUser = useSelector((state) => state.user.idUser)
    const [isCreator, setIsCreator] = useState(location.state.isCreator);
    const [poleTheEnemy, setPoleTheEnemy] = useState([
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ]);
    const [selectedSquare, setSelectedSquare] = useState() //координаты попадания
    const [isWaitPlayer, setIsWaitPlayer] = useState(false)
    const [startTimer, setStartTimer] = useState(false)
    const [timer, setTimer] = useState(120);
    const [motion, setMotion] = useState(() => !!isCreator)
    const game = {
        id: params.id,
        player1: null,
        player2: null,
        resultGame: null,
        fieldPlayer1: null,
        fieldPlayer2: null,
        x: null,
        y: null,
        status: ""
    }

    useEffect(() => {
        renderShipsBattle(polePlayer)
    }, [polePlayer]);

    useEffect(() => {
        console.log(poleTheEnemy)
        renderShipsBattleComp(poleTheEnemy)
    }, [poleTheEnemy]);

    useEffect(() => {
        isCreator && setIsWaitPlayer(true);
        if(stompClient == null){
            connect();
            setTimeout(()=> send(), 300);
        }
    }, []);

    useEffect(() => {
        //из-за афк убивает!!
        if(selectedSquare && poleTheEnemy[selectedSquare.y][selectedSquare.x] === 0){
            userHit(selectedSquare.y, selectedSquare.x);
            setSelectedSquare(undefined);
        }
    }, [selectedSquare])

    function userHit(y, x) {
        isCreator ?
            stompClient.send("/app/game",{}, JSON.stringify({...game,
                player1: idUser,
                x: y,
                y: x,
                status: "MOTION"
            }))
            :
            stompClient.send("/app/game",{}, JSON.stringify({...game,
                player2: idUser,
                x: y,
                y: x,
                status: "MOTION"
            }));
    }

    const connect = ()=>{
        let socket = new SockJS(`http://${window.location.hostname}:8080/ws`);
        stompClient = over(socket);
        stompClient.connect({}, onConnected, onError);
        dispatch(joinUser(stompClient, isCreator ?
                {...game, player1: idUser,}
                :
                {...game, player2: idUser,}
        ))
    }

    const onConnected = () => {
        stompClient.subscribe(
            "/user/" + params.id + "/game", onMessageReceived)
    }

    const onMessageReceived = (msg) => {
        let game1 = JSON.parse(msg.body)
        const pole1 = polePlayer.slice();
        const pole2 = poleTheEnemy.slice();
        console.log(game1.status);
            switch (game1.status) {
                case "JOIN_PLAYER_2": {
                    setIsWaitPlayer(false);
                    setStartTimer(() => true);
                    break;
                }
                case "ПОПАЛ": {
                    if(idUser === game1.id) {
                        pole2[game1.x][game1.y] = 2;
                        setPoleTheEnemy(pole2);
                        setMotion(true)
                        setTimer(120)
                    }
                    else {
                        pole1[game1.x][game1.y] = 2;
                        setPolePlayer(pole1);
                        setMotion(false)
                        setTimer(120)
                    }
                    break;
                }
                case "МИМО": {
                    if(idUser === game1.id) {
                        pole2[game1.x][game1.y] = -1;
                        setPoleTheEnemy(pole2);
                        setMotion(false)
                        setTimer(120)
                    }
                    else {
                        pole1[game1.x][game1.y] = -1;
                        setPolePlayer(pole1);
                        setMotion(true)
                        setTimer(120)
                    }
                    break;
                }
                case "УБИЛ": {
                    if(idUser === game1.id) {
                        pole2[game1.x][game1.y] = 3;
                        setDead(pole2, game1.x, game1.y)
                        setArea(game1.x, game1.y, pole2)
                        setPoleTheEnemy(pole2);
                        setMotion(true)
                        setTimer(120)
                    }
                    else {
                        pole1[game1.x][game1.y] = 3;
                        setDead(pole1, game1.x, game1.y)
                        setArea(game1.x, game1.y, pole1)
                        setPolePlayer(pole1);
                        setMotion(false)
                        setTimer(120)
                    }
                    break;
                }
                case "ИТОГ": {
                    if(idUser === game1.id) {
                        pole2[game1.x][game1.y] = 3;
                        setDead(pole2, game1.x, game1.y)
                        setArea(game1.x, game1.y, pole2)
                        setPoleTheEnemy(() => pole2);
                        setMotion(() => true)
                        addHistoryGame()
                        setStartTimer(() => false)
                        setTimeout(() => alert("Вы победили"), 200);
                        navigate("/")
                    }
                    else {
                        pole1[game1.x][game1.y] = 3;
                        setDead(pole1, game1.x, game1.y)
                        setArea(game1.x, game1.y, pole1)
                        setPolePlayer(() => pole1);
                        setMotion(() => false)
                        setStartTimer(() => false)
                        setTimeout(() => alert("Вы проиграли"), 200);
                        navigate("/")
                    }
                    break;
                }
                case "DISCONNECTION": {
                    if(idUser === game1.id) {
                        addHistoryGame()
                        alert("Вы победили")
                        setStartTimer(false)
                        navigate("/")
                    }
                    else {
                        addHistoryGame()
                        alert("Вы победили")
                        setStartTimer(false)
                        navigate("/")
                    }
                    break;
                }
            }
    };
    
    const send=()=>{
        isCreator ?
        stompClient.send("/app/game",{}, JSON.stringify({...game,
            player1: idUser,
            fieldPlayer1: polePlayer,
            status: "JOIN"
        }))
        :
        stompClient.send("/app/game",{}, JSON.stringify({...game,
            player2: idUser,
            fieldPlayer2: polePlayer,
            status: "JOIN_PLAYER_2"
        }));
    }

    const onError = (err) => {
        console.log(err);
    }

    function addHistoryGame() {
        axios.get(`http://${window.location.hostname}:8080/api/saveGameHistory`, {
            params: {
                idGame: params.id,
                idUser: idUser
            }
        })
            .catch((error) => {
            console.error(error.response);
        })
    }

    useEffect(() => {
        if(timer === 0) {
            if(motion){
                alert("Вы проиграли")
                setStartTimer(false)
            }
            else{
                addHistoryGame()
                alert("Вы победили")
                setStartTimer(false)
            }
        }
    }, [timer])

    return (
        <div>
            <Timer start={startTimer} timer={timer} setTimer={setTimer}/>
            <Audio/>
            <Loader polePlayer={polePlayer} isWaitPlayer={isWaitPlayer}/>
            <div className='poleBattle'>
                    <div>
                        <PoleBattle numbers={numbers} letters={letters} isPolePlayer={true}/>
                        <label style={{display: 'flex', justifyContent: 'center', marginTop: '20px', fontSize: '20px'}}>Ваше поле</label>
                    </div>
                    <div className='lineBattle'/>
                    <div className= {motion ? 'arrow arrow-right' : 'arrow arrow-left'}/>
                    <div>
                        <PoleBattle numbers={numbers} letters={letters} setSelectedSquare={setSelectedSquare} motion={motion} isPolePlayer={false}/>
                        <label style={{display: 'flex', justifyContent: 'center', marginTop: '20px', fontSize: '20px'}}>Поле противника</label>
                    </div>

            </div>

        </div>
    );
};

export default BattleThePlayer;