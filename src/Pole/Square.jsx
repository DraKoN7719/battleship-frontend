import React, {useState} from 'react';
import classes from '../styles/Pole.css'

const Square = function (props) {

    return (
        <div onMouseEnter={() => props.setSelectedSquare({x: props.cord.x, y: props.cord.y})}
             onMouseLeave={() => props.setSelectedSquare(undefined)}
             className='square2'>
            <button className='square detected'/>
        </div>
    )
}
export default Square;