import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Modal from "../Modal/Modal";
import classes from "../styles/LoadModal.css"
import {useSelector} from "react-redux";

const SaveAndLoad = ({placement, shipList, setCoordinates}) => {
    const [nameSave, setNameSave] = useState();
    const [modalActive, setModalActive] = useState(false);
    const [listPlacement, setListPlacement] = useState();
    const idUser = useSelector(state => state.user.idUser);

    function getListPlacement() {
        axios.get(`http://localhost:8080/api/placement/${idUser}`
        ).then(res => {
            if(res.data) setListPlacement(res.data);
        }).catch((error) => {
            console.error(error.response);
        })
    }

    useEffect(()=>{
        getListPlacement()
    }, [])

    function savePlacement(e) {
        e.stopPropagation()
        axios.post(`http://localhost:8080/api/placement?isOverwrite=false`, {
            "userId": idUser,
            "placementName": nameSave,
            "placement": placement
        }).then(
            res => {
                if (res.data) {
                    if (window.confirm("Расстановка с таким именем уже существует, вы действительно хотите перезаписать?")) {
                        axios.post(`http://localhost:8080/api/placement?isOverwrite=true`, {
                            "userId": idUser,
                            "placementName": nameSave,
                            "placement": placement
                        }).then(
                            res => {
                                if(!res.data) {
                                    alert("Расстановка сохранена");
                                    document.getElementById("nameSave").value = "";
                                    setNameSave("");
                                }

                            })
                            .catch((error) => {
                                window.alert("Что-то пошло не так");
                                console.error(error.response);
                            })
                    }
                } else {
                    alert("Расстановка сохранена");
                    document.getElementById("nameSave").value = "";
                    setNameSave("");
                }
            })
            .catch((error) => {
                window.alert("Расстановка с таким именем уже существует");
                console.error(error.response);
        })
        setTimeout(()=> getListPlacement(), 100);

    }

    function removeCountShipList(place) {
        shipList.map(x => x.count = 0);
        setCoordinates(place.placement)
    }

    return (
        <div >
            <div className='save'>
                <input id='nameSave' placeholder='Название расстановки'
                       style={{borderRadius: '20px', width: '280px', marginLeft: 'auto', paddingLeft: '18px', fontSize: '20px'}}
                       onChange={(e) => setNameSave(e.target.value)}/>
                {(shipList.filter(x => x.count === 0)).length  === 4 ? <button onClick={(e) => savePlacement(e)}
                                                                               className='saveAndLoad_button'
                                                                               style={{marginLeft: 'auto'}}>Сохранить</button> :
                    <button onClick={() => alert('Расставьте все корабли на поле!!!')} className='saveAndLoad_button'
                            style={{marginLeft: 'auto'}}>Сохранить</button>
                }
            </div>
            <button className='load saveAndLoad_button' onClick={() => setModalActive(true)}>Загрузить</button>
            <Modal active={modalActive} setActive={setModalActive} style={'modal__content_2'}>
                <div className="load-scroll-table">
                    <table style={{border: '3px solid black', background: '#a9a7a7'}}>
                        <thead>
                        <tr>
                            <th>Название расстановки</th>
                        </tr>
                        </thead>
                    </table>
                    <div className="load-scroll-table-body">
                        <table>
                            <tbody>
                            {listPlacement && listPlacement.map(place =>
                                <tr>
                                    <td onClick={() => removeCountShipList(place)}>
                                        {place.placementName}
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default SaveAndLoad;