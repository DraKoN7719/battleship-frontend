import React, {useEffect, useState} from 'react';
import axios from "axios";
import classes from "../styles/UserPlacement.css"
import PoleUserPlacement from "./PoleUserPlacement";
import {renderShips, renderShipsBattle, renderShipsListPlacement} from "../component/RenderShips";
import {Link} from "react-router-dom";

const ListUserPlacement = () => {
    //Добавить очистку поля после удаления расстановки
    //Добавить подсветку выбранной расстановки
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];
    const [idUser, setIdUser] = useState(1);
    const [listPlacement, setListPlacement] = useState();
    const [selectedSquare, setSelectedSquare] = useState()
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


   function getListPlacement() {
        axios.get(`http://localhost:8080/api/placement/${idUser}`
        ).then(res => {
            if(res.data) setListPlacement(res.data);
        }).catch((error) => {
            console.error(error.response);
        })
        return undefined
    }

    useEffect(() => {
        renderShipsListPlacement(coordinates)
    }, [coordinates]);

    useEffect(()=>{
        getListPlacement()
    }, [])

    function deleteUserPlacement(placementName) {
        if(placementName !== undefined)
            axios.delete(`http://localhost:8080/api/placement/${idUser}?placementName=${placementName}`)
                .then(
                getListPlacement()
            ).catch((error) => {
                console.error(error.response);
            })
        getListPlacement();
    }

    return (
        <div className='listUserPlacement'>
            <div className="scroll-table">
                <table style={{border: '3px solid black', background: '#a9a7a7'}}>
                    <thead>
                    <tr>
                        <th>Название расстановки</th>
                    </tr>
                    </thead>
                </table>
                <div className="scroll-table-body">
                    <table>
                        <tbody>
                        {listPlacement && listPlacement.map(place =>
                            <tr>
                                <td onClick={() => setCoordinates(place.placement)}>
                                    {place.placementName}
                                    <img className='img' onClick={() => deleteUserPlacement(place.placementName)} src = {require ("../styles/close.png")}/>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <PoleUserPlacement numbers={numbers} letters={letters} setSelectedSquare={setSelectedSquare}/>
            <Link  to="/" className='button_back_list_placement'>Назад</Link>
        </div>
    );
};

export default ListUserPlacement;