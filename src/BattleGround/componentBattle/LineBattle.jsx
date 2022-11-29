import React from 'react';
import Square from "../../Pole/Square";
import SquareBattle from "./SquareBattle";

const LineBattle = (props) => {
    let array = []
    for (let i = 0; i < 10; i++){
        array.push(<SquareBattle cord ={{x : i , y : props.y }} setSelectedSquare={props.setSelectedSquare} motion={props.motion}/>)
    }
    return (
        <div className={'line'}>
            {array}
        </div>
    )
};

export default LineBattle;