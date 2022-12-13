import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {renderShipsBattle} from "../component/RenderShips";
import PoleBattle from "./componentBattle/PoleBattle";
import {useSelector} from "react-redux";
import SockJS from "sockjs-client";
import {over} from "stompjs";
import Loader from "./componentBattle/Loader";

let stompClient = null;
const BattleThePlayer = () => {
    const params = useParams();
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
    const location = useLocation()
    const [polePlayer, setPolePlayer] = useState(location.state.coordinates);
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
    const [motion, setMotion] = useState(true)


    useEffect(() => {
        renderShipsBattle(polePlayer)
    }, [polePlayer]);

    //text websocket

    useEffect(() => {
        isCreator && setIsWaitPlayer(true);
        connect();
        setTimeout(()=> send(), 300);
    }, []);


    const connect = ()=>{
        let socket = new SockJS("http://localhost:8080/ws");
        stompClient = over(socket);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
         /*stompClient.subscribe(
             "/topic/user", onMessageReceived)*/
        stompClient.subscribe(
            "/user/" + params.id + "/queue/messages", onMessageReceived)
    }

    const onMessageReceived = (msg) => {
        let game = JSON.parse(msg.body)
        console.log(game);
        switch (game.status) {
            case "JOIN_PLAYER_2": {
                setIsWaitPlayer(false);
                break;
            }
        }
    };
    
    const send=()=>{
        let game;
        isCreator ?
        game = {
            id: params.id,
            player1: idUser,
            player2: null,
            resultGame: null,
            fieldPlayer1: parseMatrixToString(),
            fieldPlayer2: null,
            status: "JOIN"
        }
        :
        game = {
            id: params.id,
            player1: null,
            player2: idUser,
            resultGame: null,
            fieldPlayer1: null,
            fieldPlayer2: parseMatrixToString(),
            status: "JOIN_PLAYER_2"
        }
        /*stompClient.send("/app/test",{}, JSON.stringify(game));*/
        stompClient.send("/app/chat",{}, JSON.stringify(game));
    }

    function parseMatrixToString() {
        let result = "";
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                  (i === 9 && j === 9) ? result+=polePlayer[i][j] : result+=polePlayer[i][j]+","
            }
        }
        return result;
    }

    const onError = (err) => {
        console.log(err);
    }

    function disconnect() {
        if (stompClient != null) {
            stompClient.close();
            stompClient.disconnect();
        }
        console.log("Disconnected");
    }
    return (
        <div>
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