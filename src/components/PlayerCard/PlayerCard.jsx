import React from 'react';

function PlayerCard(props) {
  const { name } = props;

  return (
    <div className="PlayerCard">
      <h2>{name}</h2>
    </div>
  );
}

export default PlayerCard;
