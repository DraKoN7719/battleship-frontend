import React, {useEffect, useState} from 'react';
import PoleBattle from "./componentBattle/PoleBattle";
import classes from '../styles/PoleBattle.css'
import {Link, useLocation, useNavigate } from 'react-router-dom';
import {renderShipsBattle} from "../component/RenderShips";


const BattleTheComputer = () => {
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
    const location = useLocation()
    const [polePlayer, setPolePlayer] = useState(location.state);

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
    const [motion, setMotion] = useState(true)

    useEffect(() => {
        console.log(selectedSquare)
        if(selectedSquare !== undefined){
            const poleComputer2 = poleComputer.slice();
            //проверить попал ли игрок и изменить поле компьютера
            /*poleComputer2[selectedSquare.y][selectedSquare.x] = 1;
            setPoleComputer(poleComputer2)*/
            setMotion(false)
        }
    }, [selectedSquare]);

    useEffect(() => {
        renderShipsBattle(polePlayer)
    }, [polePlayer]);

    return (
        <div>
            <div className='poleBattle'>
                <div>
                    <PoleBattle numbers={numbers} letters={letters} isPolePlayer={true}/>
                    <label style={{display: 'flex', justifyContent: 'center', marginTop: '20px', fontSize: '20px'}}>Ваше поле</label>
                </div>
                <div className='lineBattle'/>
                <div className= {motion ? 'arrow arrow-right' : 'arrow arrow-left'}/>
                <div>
                    <PoleBattle numbers={numbers} letters={letters} setSelectedSquare={setSelectedSquare} motion={motion} isPolePlayer={false}/>
                    <label style={{display: 'flex', justifyContent: 'center', marginTop: '20px', fontSize: '20px'}}>Поле противника</label>
                </div>

            </div>
        </div>
    );
};

export default BattleTheComputer;