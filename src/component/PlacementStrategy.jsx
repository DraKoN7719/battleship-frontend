import React, {useState} from 'react';
import axios from "axios";
import ponchik from '../styles/Pole.css'

const PlacementStrategy = ({setCoordinates, shipList, setShipList}) => {
    const [placementString, setPlacementString] = useState("");

    /*function parseStringInMatrix() {
        let matrix = [];
        for(let i = 0, j = 19, k = 0; i < 201 && j < 201; i+=20, j+=20, k++){
            matrix[k] = placementString.substring(i,j).split(",").map(Number);
        }
        setCoordinates(matrix);
    }*/

    function shoresStrategy() {
        axios.get(`http://localhost:8080/api/placement/shores`)
            .then(res => {
                if(res.data){
                    setCoordinates(res.data);
                }})
            .catch((error) => {
                console.error(error.response);
            })
        removeCountShipList()
    }

    function randomStrategy() {
        axios.get(`http://localhost:8080/api/placement/random`)
            .then(res => {
                if(res.data){
                    setCoordinates(res.data);
                }})
            .catch((error) => {
                console.error(error.response);
            })
        removeCountShipList()
    }

    function removeCountShipList() {
        shipList.map(x => x.count = 0);
    }

    function halfFieldStrategy() {
        axios.get(`http://localhost:8080/api/placement/halfField`)
            .then(res => {
                if(res.data){
                    setCoordinates(res.data);
                }})
            .catch((error) => {
                console.error(error.response);
            })
        removeCountShipList()
    }

    return (
        <div>
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

export default PlacementStrategy;