import React, {useState} from 'react';
import classes from '../style/Ship.css'
import ponchik from '../style/Pole.css'
import {Link, useLocation, useNavigate} from "react-router-dom";
import Ship from "./Ship";
import PlacementStrategy from "./PlacementStrategy";

const ShipList = ({shipList, setSelectedShip, setCoordinates}) => {

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
            <PlacementStrategy setCoordinates={setCoordinates}/>
            <Link  to="/" className='button_back'>Назад</Link>
            <Link  to="/battleTheComputer" className='button_battle'>В бой</Link>
        </div>
    );
};

export default ShipList;