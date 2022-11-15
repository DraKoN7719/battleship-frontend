import React, {useState} from 'react';
import classes from '../style/Pole.css'




const Square = function (props) {

    let [isShip , setShip] = useState(false);

    function getCords() {
        setShip(isShip = !isShip);
        console.log(props.cord.x + ' ' + props.cord.y + '    isShip = ' + isShip )
    }

    return (
        <div onMouseEnter={() => props.setSelectedSquare({x: props.cord.x, y: props.cord.y})}
             onMouseLeave={() => props.setSelectedSquare(undefined)}
             className={props.style}>
            <button className={ isShip ?'shipSquare' :'square'} onClick={getCords}/>
        </div>
    )
}
export default Square;