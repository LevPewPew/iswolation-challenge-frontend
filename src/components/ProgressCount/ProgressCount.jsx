import React from 'react';
import { colors } from 'styles';

function ProgressCount(props) {
  const { maxReps, reps } = props;

  const createFractionString = () => {
    const leadingZeros = (Math.log(maxReps) /  Math.LN10) + 1;
    const currentReps = `${reps}`.padStart(leadingZeros, 0);
    const fractionString = `${currentReps} / ${maxReps}`

    return fractionString;
  }
  
  return (
    <div
      className="ProgressCount"
      style={{
        background: `${reps === maxReps ? "goldenrod" : colors.brickPoopHouse}`
      }}
    >
      <span>{createFractionString()}</span>
    </div>
  );
}

export default ProgressCount;
