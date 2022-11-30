import React from 'react';
import classes from '../styles/Pole.css'
import Square from "./Square";

const Line = function (props) {
    let array = []
    for (let i = 0; i < 10; i++){
        array.push(<Square cord ={{x : i , y : props.y }} setSelectedSquare={props.setSelectedSquare}/>)
    }
    return (
        <div className={'line'}>
            {array}
        </div>
    )
}
export default Line;