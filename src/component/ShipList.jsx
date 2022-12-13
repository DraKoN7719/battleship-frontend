import React, {useState} from 'react';
import classes from '../styles/Ship.css'
import ponchik from '../styles/Pole.css'
import {Link, useLocation} from "react-router-dom";
import Ship from "./Ship";
import PlacementStrategy from "./PlacementStrategy";

const ShipList = ({shipList, setSelectedShip, setCoordinates, setShipList, setModalActive, isBattleThePlayer, coordinates}) => {

    return (
        <div>

            <h1>
                Доступные корабли:
            </h1>
            {shipList.map(ship =>
                <div className='leftLine' style={{margin: '20px'}}>
                    <div style={{justifyContent: 'center', width: '45px', height: '45px', fontSize: '30px', lineHeight: '45px', display: 'flex', fontWeight: 'bold', marginRight: '15px'}}>
                        {'x' + ship.count}
                    </div>
                    <Ship ship={ship} key={ship.id} setSelectedShip={setSelectedShip}/>
                </div>
            )}
            <PlacementStrategy setCoordinates={setCoordinates} shipList={shipList} setShipList={setShipList}/>
            <Link  to="/" className='button_back'>Назад</Link>
            {(shipList.filter(x => x.count === 0)).length  === 4 ?
                (isBattleThePlayer ? <Link to="/lobbyOnlineGame" state={coordinates} className='button_battle' >В бой</Link>:
                    <Link className='button_battle' onClick={() => setModalActive(true)}>В бой</Link>) :
                <Link onClick={() => alert('Расставьте все корабли на поле!!!')} className='button_battle'>В бой</Link>
            }
        </div>
    );
};

export default ShipList;