import React, {useEffect, useState} from 'react';
import PoleBattle from "./componentBattle/PoleBattle";
import classes from '../styles/PoleBattle.css'
import {Link, useLocation, useNavigate } from 'react-router-dom';
import {renderShipsBattle} from "../component/RenderShips";
import {renderShipsBattleComp} from "../component/RenderShips";
import axios from "axios";


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

    const [selectedSquare, setSelectedSquare] = useState({x: null,y:null}) //координаты попадания
    const [selectedComp, setSelectedComp] = useState({x: null,y:null});//координаты выстрела оппонента
    const [motion, setMotion] = useState(true)
    const cc = useState();

    function send(){
        axios.post(`http://localhost:8080/api/shoot`, {
            "x": selectedSquare.y,
            "y": selectedSquare.x
        }).then(res => {
            console.log(res.data)
            if (res.data === 1) console.log('Попал')
            if(res.data === 2) console.log('Убил')
            if(res.data === 0) console.log("мимо");
            if(res.data === 1) {
                const poleComputer2 = poleComputer.slice();
                poleComputer2[selectedSquare.y][selectedSquare.x] = 1;
                setPoleComputer(poleComputer2);
                setMotion(prevMotion =>true)
            }
            else  if(res.data === 0){
                const poleComputer2 = poleComputer.slice();
                poleComputer2[selectedSquare.y][selectedSquare.x] = 2;
                setPoleComputer(poleComputer2);
                setMotion(prevMotion =>false)
            }
            else  if(res.data === 2){
                const poleComputer2 = poleComputer.slice();
                poleComputer2[selectedSquare.y][selectedSquare.x] = 1;
                setArea(selectedSquare.y,selectedSquare.x,poleComputer2)
                setPoleComputer(poleComputer2);
                setMotion(prevMotion =>true)
            }

        }).catch((error) => {
            console.error(error.response);
        })

    }

    function getCompTurn(){
        axios.post(`http://localhost:8080/api/shootComp`, {

        }).then(res => {
            console.log(res.data)
            let x = res.data.x;
            let y = res.data.y;

            const polePlayer2 = polePlayer.slice();
            if(polePlayer2[x][y] === 1) {
                polePlayer2[x][y] = -1;
                setMotion(prevMotion =>false)
            }

            if(polePlayer2[x][y] === 0) {
                setMotion(prevMotion =>true)
                polePlayer2[x][y] = -2;
            }

            if(polePlayer2[x][y] >=2) {
                setMotion(prevMotion =>true)
                polePlayer2[x][y] = -2;
            }
            setPolePlayer(polePlayer2);

        }).catch((error) => {
            console.error(error.response);
        })

    }


    function setArea(x,y,pole) {
        setBorder(x,y,pole);
        let n = 1;
        while(checkBounds(x+n,y) && pole[x+n][y] === 1){
            setBorder(x+n,y,pole)
            n++
        }
        n=1;

        while(checkBounds(x-n,y) && pole[x-n][y] === 1){
            setBorder(x-n,y,pole)
            n++
        }
        n=1;

        while(checkBounds(x,y+n) && pole[x][y+n]=== 1){
            setBorder(x,y+n,pole)
            n++
        }
        n=1;

        while(checkBounds(x,y-n) && pole[x][y-n]=== 1){
            setBorder(x,y-n,pole)
            n++
        }
    }

    function checkBounds(x, y) {
        return x < 10 && x > -1 && y < 10 && y > -1
    }

    function setBorder(x,y,pole){
        if(checkBounds(x+1,y) && pole[x+1][y] === 0) pole[x+1][y] = 2
        if(checkBounds(x-1,y) && pole[x-1][y] === 0) pole[x-1][y] = 2
        if(checkBounds(x,y-1) && pole[x][y-1] === 0) pole[x][y-1] = 2
        if(checkBounds(x,y+1) && pole[x][y+1] === 0) pole[x][y+1] = 2

        if(checkBounds(x+1,y+1) && pole[x+1][y+1] === 0) pole[x+1][y+1] = 2
        if(checkBounds(x-1,y-1) && pole[x-1][y-1] === 0) pole[x-1][y-1] = 2
        if(checkBounds(x+1,y-1) && pole[x+1][y-1] === 0) pole[x+1][y-1] = 2
        if(checkBounds(x-1,y+1) && pole[x-1][y+1] === 0) pole[x-1][y+1] = 2
    }

    useEffect(() => {
        if(motion === true)
        if(selectedSquare.x !== null && poleComputer[selectedSquare.y][selectedSquare.x] !== 1 && poleComputer[selectedSquare.y][selectedSquare.x] !== 2){
                send();
            setMotion(prevMotion =>  false)

                getCompTurn()
            setMotion(prevMotion =>  true)
        }
    }, [selectedSquare]);

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    useEffect(() => {
        renderShipsBattle(polePlayer)
    }, [polePlayer]);

    useEffect(() => {
        renderShipsBattleComp(poleComputer)
    }, [poleComputer]);


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