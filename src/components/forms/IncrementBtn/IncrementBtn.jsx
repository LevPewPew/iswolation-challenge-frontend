import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { colors } from 'styles';

function IncrementBtn({ max, stateSetter, stateValue }) {
  const handleClick = (event) => {
    event.preventDefault();

    if (stateValue < max) {
      stateSetter(stateValue + 1);
    }
  };

  return (
    <button className="IncrementBtn" onClick={handleClick} disabled={stateValue === max}>
      <FontAwesomeIcon icon={faPlus} color={colors.doYouEvenLift} />
    </button>
  );
}

export default IncrementBtn;
