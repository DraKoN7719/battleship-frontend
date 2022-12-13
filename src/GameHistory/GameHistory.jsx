import React, {useEffect, useState} from 'react';
import classes from "../styles/GameHistory.css";
import classes2 from "../styles/UserPlacement.css";
import {Link} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";

const GameHistory = () => {
    const idUser = useSelector(state => state.user.idUser);
    const [gameHistory, setGameHistory] = useState();

    useEffect(()=>{
        getGameHistory()
    }, [])

    function getGameHistory() {
        axios.get(`http://localhost:8080/api/gameHistory/${idUser}`
        ).then(res => {
            if(res.data) setGameHistory(res.data);
        }).catch((error) => {
            console.error(error.response);
        })
    }
    return (
        <div className='gameHistory'>
            <div className="history-scroll-table">
                <table style={{border: '3px solid black', background: '#a9a7a7'}}>
                    <thead>
                    <tr>
                        <th>Логин противника</th>
                        <th>Итог</th>
                    </tr>
                    </thead>
                </table>
                <div className="history-scroll-table-body" /*style={gameHistory.length > 12 ? {marginRight: "calc(-1 * (80.4vw - 100%))"} : {}}*/>
                    <table>
                        <tbody>
                        {gameHistory && gameHistory.map(game =>
                            <tr style={game.result === 1 ? {background: "#58ee65"} : {background: "#f37878"}}>
                                <td>
                                    {game.player2}
                                </td>
                                <td>
                                    {game.result === 1 ? "Победа" : "Поражение"}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Link  to="/" className='button_back_list_placement'>Назад</Link>
        </div>
    );
};

export default GameHistory;