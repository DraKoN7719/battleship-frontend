import React, {useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const SaveAndLoad = ({placement, shipList}) => {
    const [nameSave, setNameSave] = useState();

    function savePlacement(e) {
        e.stopPropagation()
        axios.post(`http://localhost:8080/api/placement/save`, {
            "id_user": "В будущем будет ip пользователя",
            "nameSave": nameSave,
            "placement": placement
        }).catch((error) => {
            window.alert("Расстановка с таким именем уже существует");
            console.error(error.response);
        })
    }

    function removeCountShipList() {
        shipList.map(x => x.count = 0);
    }

    return (
        <div >
            <div className='save'>
                <input placeholder='Название расстановки'
                       style={{borderRadius: '20px', width: '280px', marginLeft: 'auto', paddingLeft: '18px', fontSize: '20px'}}
                       onChange={(e) => setNameSave(e.target.value)}/>
                {(shipList.filter(x => x.count === 0)).length  === 4 ? <button onClick={(e) => savePlacement(e)}
                                                                               className='saveAndLoad_button'
                                                                               style={{marginLeft: 'auto'}}>Сохранить</button> :
                    <button onClick={() => alert('Расставьте все корабли на поле!!!')} className='saveAndLoad_button'
                            style={{marginLeft: 'auto'}}>Сохранить</button>
                }
            </div>
            <button className='load saveAndLoad_button'>Загрузить</button>
        </div>
    );
};

export default SaveAndLoad;