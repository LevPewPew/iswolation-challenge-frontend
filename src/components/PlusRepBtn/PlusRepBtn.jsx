import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BicepParticle } from 'components';
import { SmokeParticleMotion } from 'animations';
import { colors } from 'styles';

function PlusRepBtn({ maxReps,  setReps, reps }) {
  const audio = new Audio("https://lev-webdev-assets-123098.s3-ap-southeast-2.amazonaws.com/gunshot1.wav");
  const [ biceps, setBiceps ] = useState([]);
  const timer = useRef(false);

  const generateBicep = () => (
    <BicepParticle key={`particle_${new Date().getTime()}`} />
  );

  const handleClick = () => {
    if (reps < maxReps) {
      let newBiceps = biceps;
      newBiceps.push(generateBicep());
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
