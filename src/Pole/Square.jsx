import React, {useState} from 'react';
import classes from '../style/Pole.css'

const Square = function (props) {

    return (
        <div onMouseEnter={() => props.setSelectedSquare({x: props.cord.x, y: props.cord.y})}
             onMouseLeave={() => props.setSelectedSquare(undefined)}
             className={props.style}>
            <button className='square'/>
        </div>
    )
}
export default Square;