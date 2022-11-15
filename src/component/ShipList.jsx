import React from 'react';
import classes from '../style/Ship.css'
import ponchik from '../style/Pole.css'
import Ship from "./Ship";

const ShipList = ({shipList, setSelectedShip}) => {

    return (
        <div>
            <h1>
                Доступные корабли
            </h1>
            {shipList.map(ship =>
                <div className='leftLine' style={{margin: '20px'}}>
                    <div style={{justifyContent: 'center', width: '45px', height: '45px', fontSize: '30px', lineHeight: '45px', display: 'flex', fontWeight: 'bold', marginRight: '15px'}}>
                        {'x' + ship.count}
                    </div>
                    <Ship ship={ship} key={ship.id} setSelectedShip={setSelectedShip}/>
                </div>
            )}
        </div>
    );
};

export default ShipList;