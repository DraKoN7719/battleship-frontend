import React from 'react';
import classes from '../styles/Pole.css'
import Line from "./Line";

const Pole = function ({numbers, letters, setSelectedSquare}) {
    let y = 0;
    return (
        <div>
            <div className="topLine">
                {letters.map(letter =>
                    <div style={{justifyContent: 'center', width: '45px', height: '45px', fontSize: '24px', lineHeight: '45px', display: 'flex'}}>
                        {letter}
                    </div>
                )}
            </div>
            <div className={'pole'}>
                {numbers.map(number =>
                    <div   className="leftLine">
                        <div style={{justifyContent: 'center', width: '45px', height: '45px', fontSize: '24px', lineHeight: '45px', display: 'flex'}}>
                            {number}
                        </div>
                        <Line y ={y++}  setSelectedSquare={setSelectedSquare}/>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Pole;