import React from 'react';
import classes from '../style/Pole.css'
import Line from "./Line";

const Pole = function () {
    return (
        <div className={'pole'}>
            <Line y ={1} />
            <Line y ={2}/>
            <Line y ={3}/>
            <Line y ={4}/>
            <Line y ={5}/>
            <Line y ={6}/>
            <Line y ={7}/>
            <Line y ={8}/>
            <Line y ={9}/>
            <Line y ={10}/>
        </div>
    )
}
export default Pole;