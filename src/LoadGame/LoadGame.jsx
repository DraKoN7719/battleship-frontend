import React, {useEffect, useState} from 'react';
import classes from "../styles/LoadGame.css";
import classes2 from "../styles/UserPlacement.css";
import axios from "axios";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const LoadGame = () => {

    const idUser = useSelector(state => state.user.idUser);
    const [listSaveGame, setListSaveGame] = useState();

    useEffect(()=>{
        getListSaveGame()
    }, [])

    function getListSaveGame() {
        axios.get(`http://localhost:8080/api/loadGame/${idUser}`
        ).then(res => {
            if(res.data) setListSaveGame(res.data);
        }).catch((error) => {
            console.error(error.response);
        })
    }

    return (
        <div className='loadGame'>
            <div className="loadGame-scroll-table">
                <table style={{border: '3px solid black', background: '#a9a7a7'}}>
                    <thead>
                    <tr>
                        <th>Название игры</th>
                    </tr>
                    </thead>
                </table>
                <div className="loadGame-scroll-table-body" /*style={gameHistory.length > 12 ? {marginRight: "calc(-1 * (80.4vw - 100%))"} : {}}*/>
                    <table>
                        <tbody>
                        {listSaveGame && listSaveGame.map(game =>
                            <tr>
                                <td style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    {game.gameName}
                                    <Link  to="/battleTheComputer" state={game.userField}  className='loadGame-button-load'>Загрузить</Link>
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

export default LoadGame;