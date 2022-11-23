import React, {useState} from 'react';
import classes from '../style/Ship.css'
import ponchik from '../style/Pole.css'
import axios from "axios";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Ship from "./Ship";

const ShipList = ({shipList, setSelectedShip, setCoordinates}) => {

    const [placementString, setPlacementString] = useState("");
    const navigate = useNavigate();

    function parseStringInMatrix() {
        let matrix = [];
        for(let i = 0, j = 19, k = 0; i < 201 && j < 201; i+=20, j+=20, k++){
            matrix[k] = placementString.substring(i,j).split(",").map(Number);
        }
        setCoordinates(matrix);
    }

    function shoresStrategy() {
        axios.get(`http://localhost:8080/api/placement/shores`)
            .then(res => {
                if(res.data){
                    setPlacementString(res.data);
                    parseStringInMatrix();
                    navigate(`/PrepareForBattle`)
                }})
            .catch((error) => {
            console.error(error.response);
        })
    }

    function randomStrategy() {
        axios.get(`http://localhost:8080/api/placement/random`)
            .then(res => {
                if(res.data){
                    setPlacementString(res.data);
                    parseStringInMatrix();
                    navigate(`/PrepareForBattle`)
                }})
            .catch((error) => {
                console.error(error.response);
            })
    }

    function halfFieldStrategy() {
        axios.get(`http://localhost:8080/api/placement/halfField`)
            .then(res => {
                if(res.data){
                    setPlacementString(res.data);
                    parseStringInMatrix();
                    navigate(`/PrepareForBattle`)
                }})
            .catch((error) => {
                console.error(error.response);
            })
    }

    return (
        <div>
            <h1>
                Доступные корабли:
            </h1>
            {shipList.map(ship =>
                <div className='leftLine' style={{margin: '20px'}}>
                    <div style={{justifyContent: 'center', width: '45px', height: '45px', fontSize: '30px', lineHeight: '45px', display: 'flex', fontWeight: 'bold', marginRight: '15px'}}>
                        {'x' + ship.count}
                    </div>
                    <Ship ship={ship} key={ship.id} setSelectedShip={setSelectedShip}/>
                </div>
            )}
            <h1>
                Расставить по стратегии:
            </h1>
            <div className='my_div_button'>
                <button className='my_button' onClick={randomStrategy}>Случайная</button>
                <button className='my_button' onClick={halfFieldStrategy}>Половина поля</button>
                <button className='my_button' onClick={shoresStrategy}>Берега</button>
            </div>
        </div>
    );
};

export default ShipList;