import React, {useEffect, useState} from 'react';
import Pole from "./Pole";
import ShipList from "../component/ShipList";
import classes from '../styles/Pole.css'
import classess from "../styles/modal.css"
import Ship from "../component/Ship";
import {renderShips} from "../component/RenderShips";
import Modal from "../Modal/Modal";
import {Link} from "react-router-dom";

const PrepareForBattle = function () {
    //Изменить удаление кораблей на правую либо левую кнопку мыши
    //Добавить редактирование уже расположенного корабля
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
    const [shipList, setShipList] = useState([
        {id: 1, numberOfDecks: 4, count: 1},
        {id: 2, numberOfDecks: 3, count: 2},
        {id: 3, numberOfDecks: 2, count: 3},
        {id: 4, numberOfDecks: 1, count: 4},
    ]);
    const [modalActive, setModalActive] = useState(false);
    const [coordinates, setCoordinates] = useState([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    const [invertedShip, setInvertedShip] = useState(false)
    const [isBattleThePlayer, setIsBattleThePlayer] = useState(false) // проверка на игру с игроком
    const [countOrientation, setCountOrientation] = useState(0)
    const [selectedShip, setSelectedShip] = useState()
    const [selectedSquare, setSelectedSquare] = useState() // координаты куда пользователь пытается поставить корабль
    const [mousePos, setMousePos] = useState({x: 0, y: 0});
    const [activeShip, setActiveShip] = useState() // какой корабль взял пользователь
    const handleMouse = (event) => {
        const mouse = {};
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        setMousePos(mouse);
    };

    function getShip(e) {
        if (selectedShip !== undefined && shipList[selectedShip - 1].count > 0 && e.button === 0) {
            let copy = Object.assign([], shipList);
            copy[selectedShip - 1] = {
                id: selectedShip,
                numberOfDecks: shipList[selectedShip - 1].numberOfDecks,
                count: shipList[selectedShip - 1].count - 1
            };
            setShipList(copy);
            setActiveShip(selectedShip);
        }
    }

    function check(shipId) {
        let horizontalShip = [0, 0, 0];
        let verticalShip = [0, 0, 0];
        let check = true;
        invertedShip ? verticalShip = [1, 2, 3] : horizontalShip = [1, 2, 3];
        invertedShip && (selectedSquare.y + shipList[shipId - 1].numberOfDecks - 1 <= 9 ? check = true : check = false);
        if (coordinates[selectedSquare.y][selectedSquare.x] === 0) {
            switch (shipId) {
                case 1: {
                    if (check && coordinates[selectedSquare.y + verticalShip[0]][selectedSquare.x + horizontalShip[0]] === 0 &&
                        coordinates[selectedSquare.y + verticalShip[1]][selectedSquare.x + horizontalShip[1]] === 0 &&
                        coordinates[selectedSquare.y + verticalShip[2]][selectedSquare.x + horizontalShip[2]] === 0) {
                        coordinates[selectedSquare.y][selectedSquare.x] = 1;
                        coordinates[selectedSquare.y + verticalShip[0]][selectedSquare.x + horizontalShip[0]] = 1;
                        coordinates[selectedSquare.y + verticalShip[1]][selectedSquare.x + horizontalShip[1]] = 1;
                        coordinates[selectedSquare.y + verticalShip[2]][selectedSquare.x + horizontalShip[2]] = 1;
                        placementRules(4);
                        return true;
                    }
                    return false;
                }
                case 2: {
                    if (check && coordinates[selectedSquare.y + verticalShip[0]][selectedSquare.x + horizontalShip[0]] === 0 &&
                        coordinates[selectedSquare.y + verticalShip[1]][selectedSquare.x + horizontalShip[1]] === 0) {
                        coordinates[selectedSquare.y][selectedSquare.x] = 1;
                        coordinates[selectedSquare.y + verticalShip[0]][selectedSquare.x + horizontalShip[0]] = 1;
                        coordinates[selectedSquare.y + verticalShip[1]][selectedSquare.x + horizontalShip[1]] = 1;
                        placementRules(3);
                        return true;
                    }
                    return false;
                }
                case 3: {
                    if (check && coordinates[selectedSquare.y + verticalShip[0]][selectedSquare.x + horizontalShip[0]] === 0) {
                        coordinates[selectedSquare.y][selectedSquare.x] = 1;
                        coordinates[selectedSquare.y + verticalShip[0]][selectedSquare.x + horizontalShip[0]] = 1;
                        placementRules(2);
                        return true;
                    }
                    return false;
                }
                case 4: {
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
        if (invertedShip) {
            for (let x = selectedSquare.x - 1, y = selectedSquare.y - 1; y < selectedSquare.y + numberOfDecks + 1; x++) {
                if (x < 0) continue;
                else if (y < 0) {
                    y++;
                    x -= 1;
                    continue;
                } else if (x > 9) {
                    y++;
                    x = selectedSquare.x - 2;
                    continue;
                } else if (y === 10) {
                    break;
                }
                if (coordinates2[y][x] !== 1 && coordinates2[y][x] < 2) coordinates2[y][x] = 2;
                else if (coordinates2[y][x] >= 2) coordinates2[y][x] += 2;
                if (x === selectedSquare.x + 1) {
                    x = selectedSquare.x - 2;
                    y++;
                }
            }
        } else {
            for (let x = selectedSquare.x - 1, y = selectedSquare.y - 1; x < selectedSquare.x + numberOfDecks + 1; y++) {
                if (y < 0) continue;
                else if (x < 0) {
                    x++;
                    y -= 1;
                    continue;
                } else if (y > 9) {
                    x++;
                    y = selectedSquare.y - 2;
                    continue;
                } else if (x === 10) {
                    break;
                }
                if (coordinates2[y][x] !== 1 && coordinates2[y][x] < 2) coordinates2[y][x] = 2;
                else if (coordinates2[y][x] >= 2) coordinates2[y][x] += 2;
                if (y === selectedSquare.y + 1) {
                    y = selectedSquare.y - 2;
                    x++;
                }
            }
        }
        setCoordinates(coordinates2);
        console.log(coordinates)
    }

    function releasedShip(e) {
        e.preventDefault();
        if (activeShip !== undefined) {
            let shipId = activeShip;
            setActiveShip(undefined);
            if (selectedSquare === undefined || !check(shipId)) {
                let copy = Object.assign([], shipList);
                copy[activeShip - 1] = {
                    id: activeShip,
                    numberOfDecks: shipList[activeShip - 1].numberOfDecks,
                    count: shipList[activeShip - 1].count + 1
                };
                setShipList(copy);
            }
        }
        setInvertedShip(false);
        setCountOrientation(0);
    }

    useEffect(() => {
        renderShips(coordinates)
    }, [coordinates]);

    useEffect(() => {
        document.addEventListener("mousemove", handleMouse);
        return () => {
            document.removeEventListener("mousemove", handleMouse);
        };
    }, []);

    function orientationShip(e) {
        if (activeShip !== undefined) {
            setCountOrientation(countOrientation + 1);
            if (countOrientation === 1) {
                setInvertedShip(false);
                setCountOrientation(0);
            } else setInvertedShip(true);
        }
    }

    function press(e) {
        if (e.code === "KeyD") deleteShip();
        if (e.code === "KeyR") orientationShip();
    }

    function deleteShip(e) {
        let shipId = 0;
        let x = selectedSquare.y;
        let y = selectedSquare.x;
        if (coordinates[x][y] === 1) {
            coordinates[x][y] = 0;
            shipId += 1
            deleteArea(x, y,'all');
            let n = 1;
            while (checkNext(x + n, y,'down')) {
                shipId += 1;
                n++;
            }
            n = 1;
            while (checkNext(x - n, y,'up')) {
                shipId += 1;
                n++;
            }
            n = 1;
            while (checkNext(x, y + n,'right')) {
                shipId += 1;
                n++;
            }
            n = 1;
            while (checkNext(x, y - n,'left')) {
                shipId += 1;
                n++;
            }

            switch (shipId){
                case 4:
                    shipList[0].count = shipList[0].count+1
                    break
                case 3:
                    shipList[1].count = shipList[1].count+1
                    break
                case 2:
                    shipList[2].count = shipList[2].count+1
                    break
                case 1:
                    shipList[3].count = shipList[3].count+1
                    break
            }
            renderShips(coordinates)
        }
    }

    function checkNext(x, y,pos) {
        if (checkBounds(x, y) && coordinates[x][y] === 1) {
            coordinates[x][y] = 0;
            deleteArea(x, y,pos);
            return true
        }
        return false
    }

    function deleteArea(x, y,pos) {
        if(pos === 'right'){
            if (checkBounds(x + 1, y + 1) && coordinates[x + 1][y + 1] >= 2) coordinates[x + 1][y + 1] -= 2;
            if (checkBounds(x - 1, y + 1) && coordinates[x - 1][y + 1] >= 2) coordinates[x - 1][y + 1] -= 2;
            if (checkBounds(x, y + 1) && coordinates[x][y + 1] >= 2) coordinates[x][y + 1] -= 2;
        }
        if(pos === 'up'){
            if (checkBounds(x - 1, y) && coordinates[x - 1][y] >= 2) coordinates[x - 1][y] -= 2;
            if (checkBounds(x - 1, y - 1) && coordinates[x - 1][y - 1] >= 2) coordinates[x - 1][y - 1] -= 2;
            if (checkBounds(x - 1, y + 1) && coordinates[x - 1][y + 1] >= 2) coordinates[x - 1][y + 1] -= 2;
        }
        if(pos === 'down'){
            if (checkBounds(x + 1, y) && coordinates[x + 1][y] >= 2) coordinates[x + 1][y] -= 2;
            if (checkBounds(x + 1, y - 1) && coordinates[x + 1][y - 1] >= 2) coordinates[x + 1][y - 1] -= 2;
            if (checkBounds(x + 1, y + 1) && coordinates[x + 1][y + 1] >= 2) coordinates[x + 1][y + 1] -= 2;
        }
        if(pos === 'left'){
            if (checkBounds(x, y - 1) && coordinates[x][y - 1] >= 2) coordinates[x][y - 1] -= 2;
            if (checkBounds(x + 1, y - 1) && coordinates[x + 1][y - 1] >= 2) coordinates[x + 1][y - 1] -= 2;
            if (checkBounds(x - 1, y - 1) && coordinates[x - 1][y - 1] >= 2) coordinates[x - 1][y - 1] -= 2;
        }
        if(pos === 'all') {
            if (checkBounds(x + 1, y) && coordinates[x + 1][y] >= 2) coordinates[x + 1][y] -= 2;
            if (checkBounds(x - 1, y) && coordinates[x - 1][y] >= 2) coordinates[x - 1][y] -= 2;
            if (checkBounds(x, y + 1) && coordinates[x][y + 1] >= 2) coordinates[x][y + 1] -= 2;
            if (checkBounds(x, y - 1) && coordinates[x][y - 1] >= 2) coordinates[x][y - 1] -= 2;
            if (checkBounds(x - 1, y - 1) && coordinates[x - 1][y - 1] >= 2) coordinates[x - 1][y - 1] -= 2;
            if (checkBounds(x + 1, y - 1) && coordinates[x + 1][y - 1] >= 2) coordinates[x + 1][y - 1] -= 2;
            if (checkBounds(x + 1, y + 1) && coordinates[x + 1][y + 1] >= 2) coordinates[x + 1][y + 1] -= 2;
            if (checkBounds(x - 1, y + 1) && coordinates[x - 1][y + 1] >= 2) coordinates[x - 1][y + 1] -= 2;
        }
    }

    function checkBounds(x, y) {
        return x < 10 && x > -1 && y < 10 && y > -1
    }

    return (
        <div
            onMouseDown={(e) => getShip(e)}
            onMouseUp={(e) => releasedShip(e)}
            onKeyPress={(e) => press(e)}
            className='container' tabIndex="-1">
            {activeShip && <div style={{
                position: 'absolute',
                left: invertedShip ? mousePos.x - shipList[activeShip - 1].numberOfDecks * 22.5 : mousePos.x - 22.5 + 'px',
                top: invertedShip ? mousePos.y + (shipList[activeShip - 1].numberOfDecks - 2) * 22.5 : mousePos.y - 22.5 + 'px',
                pointerEvents: 'none',
                transform: invertedShip ? 'rotate(90deg)' : 'rotate(0deg)'
            }}>
                <Ship ship={shipList[activeShip - 1]}/>
            </div>}
            <ShipList shipList={shipList} setSelectedShip={setSelectedShip} setCoordinates={setCoordinates}
                      setShipList={setShipList} setModalActive={setModalActive} isBattleThePlayer={isBattleThePlayer}
                      coordinates={coordinates}/>
            <Pole numbers={numbers} letters={letters} setSelectedSquare={setSelectedSquare} placement={coordinates}
                  shipList={shipList} setCoordinates={setCoordinates}/>
            <Modal active={modalActive} setActive={setModalActive} style={'modal__content'}>
                <Link  to="/battleTheComputer" state={coordinates} className='modal__content__button'>Легкий</Link>
                <Link  to="/battleTheComputer" state={coordinates} className='modal__content__button'>Средний</Link>
                <Link  to="/battleTheComputer" state={coordinates} className='modal__content__button'>Сложный</Link>
            </Modal>
        </div>
    )
}
export default PrepareForBattle