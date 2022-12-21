import React, {useEffect, useState} from 'react';
import classes from "../styles/LoadGame.css";
import classes2 from "../styles/UserPlacement.css";
import axios from "axios";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const LoadGame = () => {

    const idUser = useSelector(state => state.user.idUser);
    const [listSaveGame, setListSaveGame] = useState();

    useEffect(() => {
        getListSaveGame()
    }, [])

    function getListSaveGame() {
        axios.get(`http://${window.location.hostname}:8080/api/saved-game/${idUser}`
        ).then(res => {
            if (res.data) setListSaveGame(res.data);
        }).catch((error) => {
            console.error(error.response);
        })
    }

    function loadGame(gameId) {
        axios.get(`http://${window.location.hostname}:8080/api/load-game/${gameId}`);
    }

    function deleteSavedGame(gameId, gameName) {
        if (window.confirm("Вы действительно хотите удалить игру " + gameName + "?")) {
            axios.delete(`http://${window.location.hostname}:8080/api/saved-game/${gameId}`)
                .then(() => {
                    getListSaveGame();
                    setTimeout(() => alert("Игра " + gameName + " успешно удалена!"), 100);
                })
                .catch(() => alert("Что-то пошло не так."));
        }
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
                <div
                    className="loadGame-scroll-table-body" /*style={gameHistory.length > 12 ? {marginRight: "calc(-1 * (80.4vw - 100%))"} : {}}*/>
                    <table>
                        <tbody>
                        {listSaveGame && listSaveGame.map(game =>
                            <tr>
                                <td style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    {game.gameName}
                                    <div className="loadGame-line">
                                            <Link to={"/battleTheComputer/" + game.id} state={{
                                                field: game.userField,
                                                bot: game.botId,
                                                id: game.id,
                                                botField: game.botField,
                                                motion: game.turn,
                                                isLoad: true
                                            }} className='loadGame-button-load'
                                                  onClick={() => loadGame(game.id)}>Загрузить</Link>
                                            <img className='delete_img' style={{marginLeft: "50px"}} onClick={() => deleteSavedGame(game.id, game.gameName)}
                                                 src={require("../styles/close.png")}/>
                                    </div>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Link to="/" className='button_back_list_placement'>Назад</Link>
        </div>
    );

};

export default LoadGame;