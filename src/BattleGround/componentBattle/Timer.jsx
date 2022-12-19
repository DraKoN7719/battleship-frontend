import React, {useEffect, useState} from 'react';
import classes from "../../styles/timer.css"

const Timer = ({start, timer, setTimer}) => {

    const minutes = Math.floor(timer / 60)
    const seconds = Math.floor(timer - minutes * 60);

    useEffect(() => {
        setInterval(() => {
            start && setTimer((timer) => (timer > 0 ? timer - 1 : 0));
        }, 1000)
    }, [start])

    return (
        <div className="timer">
            <snap>0{minutes}</snap>
            <snap>:</snap>
            <snap>{seconds < 10 ? "0"+seconds: seconds}</snap>
        </div>
    );
};

export default Timer;