import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { colors } from 'styles';

function IncrementBtn(props) {
  const { min, stateSetter, stateValue } = props;

  const handleClick = (event) => {
    event.preventDefault();
    
    if (stateValue > min) {
      stateSetter(stateValue - 1);
    }
  };

  return (
    <button className="IncrementBtn" onClick={handleClick} disabled={stateValue === min}>
      <FontAwesomeIcon icon={faMinus} color={colors.doYouEvenLift} />
    </button>
  );
}

export default IncrementBtn;
