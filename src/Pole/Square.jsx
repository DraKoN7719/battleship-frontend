import React, {useState} from 'react';
import classes from '../style/Pole.css'




const Square = function (props) {

    let [isShip , setShip] = useState(false);

    function getCords() {
        setShip(isShip = !isShip);
        console.log(props.cord.x + ' ' + props.cord.y + '    isShip = ' + isShip )
    }

    return (
        <div className={'square2'}>
            {isShip
                ?
                <button className={'shipSquare'} onClick={getCords}/>
                :
                <button className={'square'} onClick={getCords}/>
            }
        </div>
    )
}
export default Square;