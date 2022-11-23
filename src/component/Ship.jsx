import React from 'react';
import Square from "../Pole/Square";

const Ship = ({ship, setSelectedShip}) => {
    return (
        <div>
            <div onMouseEnter={() => setSelectedShip && setSelectedShip(ship.id)}
                 onMouseLeave={() => setSelectedShip && setSelectedShip(undefined)}
                 className='ship' style={ ship && {width: ship.numberOfDecks * 45 + 'px'}}>
            </div>
        </div>
    );
};

export default Ship;