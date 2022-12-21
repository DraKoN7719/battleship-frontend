import React, {useState} from 'react';
import class1 from "../../styles/PoleBattle.css"

const Audio = ({setAudio}) => {
    const [isMute, setIsMute] = useState(false)

    return (
        <div className="audio">
            {isMute ?
                <img className='mute' style={{width: "50px"}} onClick={() => {
                    setIsMute(() => false);
                    setAudio(() => true);
                }}
                     src={require("../../styles/mute.png")}/>
                :
                <img className='play' style={{width: "50px"}} onClick={() => {
                    setIsMute(() => true);
                    setAudio(() => false);
                }}
                     src={require("../../styles/play.png")}/>
            }
        </div>
    );
};

export default Audio;