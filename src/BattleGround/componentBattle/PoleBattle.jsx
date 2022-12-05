import React from 'react';
import LineBattle from "./LineBattle";

const PoleBattle = ({numbers, letters, setSelectedSquare, motion, isPolePlayer}) => {
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
                    <div  className="leftLine">
                        <div  style={{justifyContent: 'center', width: '45px', height: '45px', fontSize: '24px', lineHeight: '45px', display: 'flex'}}>
                            {number}
                        </div>
                        <LineBattle y ={y++} setSelectedSquare={setSelectedSquare} motion={motion} isPolePlayer={isPolePlayer}/>
                    </div>
                )}
            </div>
        </div>
    )
};

export default PoleBattle;