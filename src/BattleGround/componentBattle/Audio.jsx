import React, {useState} from 'react';
import class1 from "../../styles/PoleBattle.css"

const Audio = () => {
    const [isMute, setIsMute] = useState(false)

    return (
        <div className="audio">
            {isMute ?
                <img className='mute' style={{width: "50px"}} onClick={() => setIsMute(() => false)}
                     src={require("../../styles/mute.png")}/>
                :
                <img className='play' style={{width: "50px"}} onClick={() => setIsMute(() => true)}
                     src={require("../../styles/play.png")}/>
            }
        </div>
    );
};

export default Audio;