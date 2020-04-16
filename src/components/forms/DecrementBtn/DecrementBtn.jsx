import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { colors } from 'styles';

function DecrementBtn({ min, stateSetter, stateValue }) {
  const handleClick = (event) => {
    event.preventDefault();
    
    if (stateValue > min) {
      stateSetter(stateValue - 1);
    }
  };

  return (
    <button className="DecrementBtn" onClick={handleClick} disabled={stateValue === min}>
      <FontAwesomeIcon icon={faMinus} color={colors.doYouEvenLift} />
    </button>
  );
}

export default DecrementBtn;
