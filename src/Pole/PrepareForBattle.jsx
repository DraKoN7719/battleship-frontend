import React, {useEffect, useState} from 'react';
import Pole from "./Pole";
import ShipList from "../component/ShipList";
import classes from '../style/Pole.css'
import Ship from "../component/Ship";

const PrepareForBattle = function () {
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
    const [shipList, setShipList] = useState([
        {id: 1, numberOfDecks: 4, count: 1},
        {id: 2, numberOfDecks: 3, count: 2},
        {id: 3, numberOfDecks: 2, count: 3},
        {id: 4, numberOfDecks: 1, count: 4},
    ]);
    const [coordinates, setCoordinates] = useState([
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
    const [selectedShip, setSelectedShip] = useState()
    const [selectedSquare, setSelectedSquare] = useState() // координаты куда пользователь пытается поставить корабль
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [activeShip, setActiveShip] = useState() // какой корабль взял пользователь
    const handleMouse = (event) => {
        const mouse = {};
        mouse.x = event.clientX - 25;
        mouse.y = event.clientY - 25;
        setMousePos(mouse);

    };

    function getShip() {
        if(selectedShip != undefined && shipList[selectedShip-1].count > 0){
            let copy = Object.assign([], shipList);
            copy[selectedShip-1] = {id: selectedShip, numberOfDecks: shipList[selectedShip-1].numberOfDecks, count: shipList[selectedShip-1].count - 1};
            setShipList(copy);
            setActiveShip(selectedShip);
        }
    }

    function check(shipId) {
        if(coordinates[selectedSquare.y][selectedSquare.x] !== 5 && coordinates[selectedSquare.y][selectedSquare.x] !== 1){
            switch (shipId) {
                case 1:{
                    if(coordinates[selectedSquare.y][selectedSquare.x+1] !== 5 && coordinates[selectedSquare.y][selectedSquare.x+1] !== 1 &&
                        coordinates[selectedSquare.y][selectedSquare.x+2] !== 5 && coordinates[selectedSquare.y][selectedSquare.x+2] !== 1 &&
                        coordinates[selectedSquare.y][selectedSquare.x+3] !== 5 && coordinates[selectedSquare.y][selectedSquare.x+3] !== 1){
                        coordinates[selectedSquare.y][selectedSquare.x] = 1;
                        coordinates[selectedSquare.y][selectedSquare.x+1] = 1;
                        coordinates[selectedSquare.y][selectedSquare.x+2] = 1;
                        coordinates[selectedSquare.y][selectedSquare.x+3] = 1;
                        placementRules(4);
                        return true;
                    }
                    return false;
                }
                case 2:{
                    if(coordinates[selectedSquare.y][selectedSquare.x+1] !== 5 && coordinates[selectedSquare.y][selectedSquare.x+1] !== 1 &&
                        coordinates[selectedSquare.y][selectedSquare.x+2] !== 5 && coordinates[selectedSquare.y][selectedSquare.x+2] !== 1){
                        coordinates[selectedSquare.y][selectedSquare.x] = 1;
                        coordinates[selectedSquare.y][selectedSquare.x+1] = 1;
                        coordinates[selectedSquare.y][selectedSquare.x+2] = 1;
                        placementRules(3);
                        return true;
                    }
                    return false;
                }
                case 3:{
                    if(coordinates[selectedSquare.y][selectedSquare.x+1] !== 5 && coordinates[selectedSquare.y][selectedSquare.x+1] !== 1){
                        coordinates[selectedSquare.y][selectedSquare.x] = 1;
                        coordinates[selectedSquare.y][selectedSquare.x+1] = 1;
                        placementRules(2);
                        return true;
                    }
                    return false;
                }
                case 4:{
                    coordinates[selectedSquare.y][selectedSquare.x] = 1;
                    placementRules(1);
                    return true;
                }
            }
        }
        return false;
    }

    function placementRules(numberOfDecks) {
        const coordinates2 = coordinates.slice();
        for (let x = selectedSquare.x - 1, y = selectedSquare.y - 1; x < selectedSquare.x+numberOfDecks+1; y++){
            if(y < 0) continue;
            else if(x < 0) {x++; y-=1; continue;}
            else if(y > 9) {x++; y=selectedSquare.y - 2; continue;}
            else if(x === 10) {break;}
            if(coordinates2[y][x] !== 1) coordinates2[y][x] = 5;
            if(y === selectedSquare.y+1) {y = selectedSquare.y - 2; x++;}
        }
        setCoordinates(coordinates2);
        console.log(coordinates)
    }

    function releasedShip(e) {
        e.preventDefault();
        let shipId = activeShip;
        setActiveShip(undefined);
        if(selectedSquare != undefined && check(shipId)){
            //логика отрисовки корабля на поле с помощью css
            switch (shipId) {
                case 1:{

                    break;
                }
                case 2:{
                    break;
                }
                case 3:{
                    break;
                }
                case 4:{
                    break;
                }
            }
        }
        else{
            let copy = Object.assign([], shipList);
            copy[activeShip-1] = {id: activeShip, numberOfDecks: shipList[activeShip-1].numberOfDecks, count: shipList[activeShip-1].count + 1};
            setShipList(copy);
        }


    }

    useEffect(() => {
        document.addEventListener("mousemove", handleMouse);
        return () => {
            document.removeEventListener("mousemove", handleMouse);
        };
    }, []);

   /* useEffect(() => {
        console.log(selectedSquare)
    }, [selectedSquare]);*/

    return (
        <div onMouseDown={() => getShip()}
             onMouseUp={(e) => releasedShip(e)}
             className='container'>
            {activeShip && <div style={{position: 'absolute', left: mousePos.x + 'px', top: mousePos.y + 'px', pointerEvents: 'none'}}>
                <Ship ship={shipList[activeShip-1]}/>
            </div>}
            <ShipList shipList={shipList} setSelectedShip={setSelectedShip}/>
            <Pole numbers={numbers} letters={letters} setSelectedSquare={setSelectedSquare}/>
        </div>
    )
}
export default PrepareForBattle;