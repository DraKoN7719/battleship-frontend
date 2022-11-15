import React from 'react';
import classes from '../style/Pole.css'
import Square from "./Square";

const Line = function (props) {
    const style = 'square2';
    let array = []
    for (let i = 0; i < 10; i++){
        array.push(<Square cord ={{x : i , y : props.y }} style = {style} setSelectedSquare={props.setSelectedSquare}/>)
    }
    return (
        <div className={'line'}>
            {array}
        </div>
    )
}
export default Line;