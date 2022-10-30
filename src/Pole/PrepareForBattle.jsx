import React, {useState} from 'react';
import Pole from "./Pole";

const PrepareForBattle = function () {

    let [isShip , setCords] = useState(false);

  function getCords(){
      setCords(isShip = !isShip);
      console.log(isShip)
  }

    return (
        <div>
            <Pole></Pole>
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