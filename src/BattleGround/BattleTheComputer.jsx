import React, {useEffect, useState} from 'react';
import PoleBattle from "./componentBattle/PoleBattle";
import classes from '../style/PoleBattle.css'

const BattleTheComputer = () => {
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];

    const [polePlayer, setPolePlayer] = useState([
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ]);

    const [poleComputer, setPoleComputer] = useState([
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ]);

    const [selectedSquare, setSelectedSquare] = useState() //координаты попадания

    useEffect(() => {
        console.log(selectedSquare)
    }, [selectedSquare]);

    return (
        <div>
            <div className='poleBattle'>
                <PoleBattle numbers={numbers} letters={letters}/>
                <div className='lineBattle'/>
                <div className={'arrow arrow-left'}/>
                <PoleBattle numbers={numbers} letters={letters} setSelectedSquare={setSelectedSquare}/>
            </div>
        </div>
    );
};

export default BattleTheComputer;