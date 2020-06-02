import React from 'react';

const PlayerCard = ({ name }) => {
  return (
    <div className="PlayerCard" style={{height: `${name.length * 10}px`}}>
      <h3>{name}</h3>
    </div>
  );
}

export default PlayerCard;
