import React from 'react';

const SquareBattle = (props) => {
    return (
        <div onClick={() => props.setSelectedSquare({x: props.cord.x, y: props.cord.y})}
             className='square2'>
            <button className='square'/>
        </div>
    );
};

export default SquareBattle;