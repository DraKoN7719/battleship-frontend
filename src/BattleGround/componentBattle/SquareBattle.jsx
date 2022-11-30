import React from 'react';
import classes from '../../styles/PoleBattle.css'

const SquareBattle = (props) => {

    return (
        <div onClick={() => props.motion && props.setSelectedSquare({x: props.cord.x, y: props.cord.y})}
             className='square2' >
            <button className= {props.isPolePlayer ? 'squareBattle' : 'square'}/>
        </div>
    );
};

export default SquareBattle;