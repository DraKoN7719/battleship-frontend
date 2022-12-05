import React, {useState} from 'react';
import Pole from "../Pole/Pole";
import axios from "axios";
import classes from "../style/UserPlacement.css"

const ListUserPlacement = () => {

    const [idUser, setIdUser] = useState();
    const [listPlacement, setListPlacement] = useState(getListPlacement());


    function getListPlacement() {
        axios.post(`http://localhost:8080/api/placement/get`, {
            "id_user": idUser
        }).then(res => {
            if(res.data) return res.data;
        }).catch((error) => {
            console.error(error.response);
        })
        return undefined
    }

    return (
        <div className='listUserPlacement'>
            <table>
                <th>Название расстановки</th>
                {/*{listPlacement && listPlacement.map(placement =>
                    <tr><td>{placement.placementName}</td></tr>
                )}*/}
                <tr><td>123</td></tr>
                <tr><td>123</td></tr>
                <tr><td>123</td></tr>
            </table>
            <Pole/>
        </div>
    );
};

export default ListUserPlacement;