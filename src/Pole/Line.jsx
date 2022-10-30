import React from 'react';
import classes from '../style/Pole.css'
import Square from "./Square";

const Line = function (props) {
    return (
        <div className={'line'}>
            <Square cord ={{x : 1 , y : props.y }}/>
            <Square cord ={{x : 2, y : props.y }}/>
            <Square cord ={{x : 3, y : props.y}}/>
            <Square cord ={{x : 4, y : props.y}}/>
            <Square cord ={{x : 5, y : props.y}}/>
            <Square cord ={{x : 6, y : props.y}}/>
            <Square cord ={{x : 7, y : props.y}}/>
            <Square cord ={{x : 8, y : props.y}}/>
            <Square cord ={{x : 9, y : props.y}}/>
            <Square cord ={{x : 10, y : props.y}}/>
        </div>
    )
}
export default Line;