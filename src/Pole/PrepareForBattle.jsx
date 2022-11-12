import React, {useState} from 'react';
import Pole from "./Pole";
import ShipList from "../component/ShipList";

const PrepareForBattle = function () {

    let [isShip , setCords] = useState(false);
    const [shipList, setShipList] = useState([
        {id: 1, numberOfDecks: 4, count: 1},
        {id: 2, numberOfDecks: 3, count: 2},
        {id: 3, numberOfDecks: 2, count: 3},
        {id: 4, numberOfDecks: 1, count: 4},
    ]);

  function getCords(){
      setCords(isShip = !isShip);
      console.log(isShip)
  }

    return (
        <div>
            <ShipList shipList={shipList}/>
            <Pole/>
            { isShip
                ?
                <button onClick={getCords}>да</button>
                :
                <button onClick={getCords}>нет</button>
           }
        </div>
    )
}
export default PrepareForBattle;