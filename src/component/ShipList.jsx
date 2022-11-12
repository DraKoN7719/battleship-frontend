import React from 'react';
import classes from '../style/Ship.css'

const ShipList = ({shipList}) => {
    function dragStartHandler(e, ship) {
        console.log('drag', ship)
    }

    function dragEndHandler(e) {
        
    }

    function dragOverHandler(e) {
        e.preventDefault()
    }

    function dropHandler(e, ship) {
        e.preventDefault()
        console.log('drop', ship)
    }

    return (
        <div>
            <h1>
                Доступные корабли
            </h1>
            {shipList.map(ship =>
                <div onDragStart={(e) => dragStartHandler(e, ship)}
                      onDragLeave={(e) => dragEndHandler(e)}
                      onDragEnd={(e) => dragEndHandler(e)}
                      onDragOver={(e) =>dragOverHandler(e)}
                      onDrop={(e) => dropHandler(e, ship)}
                      className='ship' draggable={true}/>
            )}
        </div>
    );
};

export default ShipList;