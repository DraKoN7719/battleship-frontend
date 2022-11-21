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
    const [invertedShip, setInvertedShip] = useState(false)
    const [countOrientation, setCountOrientation] = useState(0)
    const [selectedShip, setSelectedShip] = useState()
    const [selectedSquare, setSelectedSquare] = useState() // координаты куда пользователь пытается поставить корабль
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [activeShip, setActiveShip] = useState() // какой корабль взял пользователь
    const handleMouse = (event) => {
        const mouse = {};
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        setMousePos(mouse);
    };

    function getShip(e) {
        if(selectedShip !== undefined && shipList[selectedShip-1].count > 0 && e.button === 0){
            let copy = Object.assign([], shipList);
            copy[selectedShip-1] = {id: selectedShip, numberOfDecks: shipList[selectedShip-1].numberOfDecks, count: shipList[selectedShip-1].count - 1};
            setShipList(copy);
            setActiveShip(selectedShip);
        }
    }

    function check(shipId) {
        let horizontalShip = [0,0,0];
        let verticalShip = [0,0,0];
        let check = true;
        invertedShip ? verticalShip = [1,2,3]: horizontalShip = [1,2,3];
        if(invertedShip){
            selectedSquare.y === (10 - shipList[shipId-1].numberOfDecks) ? check = true: check = false;
        }
        if(coordinates[selectedSquare.y][selectedSquare.x] === 0){
            switch (shipId) {
                case 1:{
                    if(check && coordinates[selectedSquare.y+verticalShip[0]][selectedSquare.x+horizontalShip[0]] === 0 &&
                        coordinates[selectedSquare.y+verticalShip[1]][selectedSquare.x+horizontalShip[1]] === 0 &&
                        coordinates[selectedSquare.y+verticalShip[2]][selectedSquare.x+horizontalShip[2]] === 0){
                        coordinates[selectedSquare.y][selectedSquare.x] = 1;
                        coordinates[selectedSquare.y+verticalShip[0]][selectedSquare.x+horizontalShip[0]] = 1;
                        coordinates[selectedSquare.y+verticalShip[1]][selectedSquare.x+horizontalShip[1]] = 1;
                        coordinates[selectedSquare.y+verticalShip[2]][selectedSquare.x+horizontalShip[2]] = 1;
                        placementRules(4);
                        return true;
                    }
                    return false;
                }
                case 2:{
                    if(check && coordinates[selectedSquare.y+verticalShip[0]][selectedSquare.x+horizontalShip[0]] === 0 &&
                        coordinates[selectedSquare.y+verticalShip[1]][selectedSquare.x+horizontalShip[1]] === 0){
                        coordinates[selectedSquare.y][selectedSquare.x] = 1;
                        coordinates[selectedSquare.y+verticalShip[0]][selectedSquare.x+horizontalShip[0]] = 1;
                        coordinates[selectedSquare.y+verticalShip[1]][selectedSquare.x+horizontalShip[1]] = 1;
                        placementRules(3);
                        return true;
                    }
                    return false;
                }
                case 3:{
                    if(check && coordinates[selectedSquare.y+verticalShip[0]][selectedSquare.x+horizontalShip[0]] === 0){
                        coordinates[selectedSquare.y][selectedSquare.x] = 1;
                        coordinates[selectedSquare.y+verticalShip[0]][selectedSquare.x+horizontalShip[0]] = 1;
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
        if(invertedShip){
            for (let x = selectedSquare.x - 1, y = selectedSquare.y - 1; y < selectedSquare.y+numberOfDecks+1; x++){
                if(x < 0) continue;
                else if(y < 0) {y++; x-=1; continue;}
                else if(x > 9) {y++; x=selectedSquare.x - 2; continue;}
                else if(y === 10) {break;}
                if(coordinates2[y][x] !== 1 && coordinates2[y][x] < 2) coordinates2[y][x] = 2;
                else if(coordinates2[y][x] >= 2) coordinates2[y][x] += 2;
                if(x === selectedSquare.x+1) {x = selectedSquare.x - 2; y++;}
            }
        }
        else {
            for (let x = selectedSquare.x - 1, y = selectedSquare.y - 1; x < selectedSquare.x+numberOfDecks+1; y++){
                if(y < 0) continue;
                else if(x < 0) {x++; y-=1; continue;}
                else if(y > 9) {x++; y=selectedSquare.y - 2; continue;}
                else if(x === 10) {break;}
                if(coordinates2[y][x] !== 1 && coordinates2[y][x] < 2) coordinates2[y][x] = 2;
                else if(coordinates2[y][x] >= 2) coordinates2[y][x] += 2;
                if(y === selectedSquare.y+1) {y = selectedSquare.y - 2; x++;}
            }
        }
        setCoordinates(coordinates2);
        console.log(coordinates)
    }

    function releasedShip(e) {
        e.preventDefault();
        if (activeShip !== undefined){
            let shipId = activeShip;
            setActiveShip(undefined);
            if(selectedSquare === undefined || !check(shipId)){
                let copy = Object.assign([], shipList);
                copy[activeShip-1] = {id: activeShip, numberOfDecks: shipList[activeShip-1].numberOfDecks, count: shipList[activeShip-1].count + 1};
                setShipList(copy);
            }
        }
        setInvertedShip(false);
        setCountOrientation(0);
    }

    useEffect(() => {
        document.addEventListener("mousemove", handleMouse);
        return () => {
            document.removeEventListener("mousemove", handleMouse);
        };
    }, []);

    /*useEffect(() => {
        console.log(invertedShip)
    }, [invertedShip]);*/


    function orientationShip(e) {
        if (activeShip !== undefined && e.code === "KeyR"){
            setCountOrientation(countOrientation+1);
            if(countOrientation === 1) {
                setInvertedShip(false);
                setCountOrientation(0);
            }
            else setInvertedShip(true);

        }
    }

    return (
        <div onMouseDown={(e) => getShip(e)}
             onMouseUp={(e) => releasedShip(e)}
             onKeyPress={(e) => orientationShip(e)}
             className='container' tabIndex="-1">
            {activeShip && <div style={{position: 'absolute',
                left: invertedShip ? mousePos.x - shipList[activeShip-1].numberOfDecks * 22.5 : mousePos.x - 22.5 + 'px',
                top: invertedShip ? mousePos.y + (shipList[activeShip-1].numberOfDecks - 2) * 22.5 : mousePos.y - 22.5 + 'px', pointerEvents: 'none',
                transform: invertedShip ? 'rotate(90deg)' : 'rotate(0deg)'}}>
                <Ship ship={shipList[activeShip-1]}/>
            </div>}
            <ShipList shipList={shipList} setSelectedShip={setSelectedShip}/>
            <Pole numbers={numbers} letters={letters} setSelectedSquare={setSelectedSquare}/>
        </div>
    )
}
export default PrepareForBattle