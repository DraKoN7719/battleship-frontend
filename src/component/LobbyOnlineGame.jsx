import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import classes from "../styles/lobbyOnlineGame.css"
import axios from "axios";
import {v4 as uuidv4} from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {closeConnect_User} from "../Store/STOMPReducer";

const LobbyOnlineGame = () => {
    const [listGame, setListGame] = useState();
    const location = useLocation()
    const [coordinates, setCoordinates] = useState(location.state);
    const router = useNavigate();
    const dispatch = useDispatch()
    const stompClient = useSelector(state => state.connect.stompClient)
    const game = useSelector(state => state.connect.game)

    useEffect(() =>{
        disconnect()
        axios.get(`http://localhost:8080/api/getListGame`)
            .then(res => {
                if(res.data) {
                    setListGame(res.data)
                }
            }).catch((error) => {
            console.error(error.response);
        })
    }, [])


    function disconnect() {
        if (stompClient != null) {
            stompClient.send("/app/game",{}, JSON.stringify({...game,
                status: "DISCONNECTION"
            }))
            stompClient.disconnect();
            dispatch(closeConnect_User())
            console.log("Disconnected");
        }
    }

    return (
        <div className="lobby">
            <div className="lobby-scroll-table">
                <table style={{border: '3px solid black', background: '#a9a7a7'}}>
                    <thead>
                    <tr>
                        <th>Логин противника</th>
                    </tr>
                    </thead>
                </table>
                <div className="lobby-scroll-table-body" /*style={gameHistory.length > 12 ? {marginRight: "calc(-1 * (80.4vw - 100%))"} : {}}*/>
                    <table>
                        <tbody>
                        {listGame && listGame.map(game =>
                            <tr>
                                <td style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    {game.id}
                                    <Link  to={"/battleThePlayer/" + game.id} state={{coordinates: coordinates, isCreator: false}}  className='connected'>Подключиться</Link>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Link  to="/PrepareForBattle" state={true} className='button_back'>Назад</Link>
            <Link to={"/battleThePlayer/" + uuidv4()} state={{coordinates: coordinates, isCreator: true}} className='button_lobby_new_game' >Создать игру</Link>
        </div>
    );
};

export default LobbyOnlineGame;