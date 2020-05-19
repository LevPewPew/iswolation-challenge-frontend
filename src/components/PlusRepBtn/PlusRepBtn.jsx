import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BicepParticle } from 'components';
import { colors } from 'styles';

function PlusRepBtn({ maxReps,  setReps, reps }) {
  const audio = new Audio("https://lev-webdev-assets-123098.s3-ap-southeast-2.amazonaws.com/gunshot1.wav");
  const [ biceps, setBiceps ] = useState([]);
  const timer = useRef(false);

  const handleClick = () => {
    // TODO, pass the player and the exercise down to this level, and then use this to query the gameState collection to POST new completedReps
    if (reps < maxReps) {
      let newBiceps = biceps;
      newBiceps.push(
        <BicepParticle
          key={`particle_${new Date().getTime()}`}
        />
      );
      setBiceps(newBiceps);
      
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setBiceps([]), 5000);

      setReps(reps + 1);
      if (reps < maxReps - 1) {
        audio.play();
      }
    } 
  };

  return (
    <button className={`PlusRepBtn`} onClick={handleClick}>
      <FontAwesomeIcon icon={faPlus} color={colors.doYouEvenLift} />
      {biceps.map((bicep) => bicep)}
    </button>
  );
}

export default PlusRepBtn;
