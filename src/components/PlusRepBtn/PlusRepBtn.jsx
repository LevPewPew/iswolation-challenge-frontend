import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Motion, spring } from 'react-motion';
import { BicepParticle } from 'components';
import { colors } from 'styles';

function PlusRepBtn({ maxReps,  setReps, reps }) {
  const audio = new Audio("https://lev-webdev-assets-123098.s3-ap-southeast-2.amazonaws.com/gunshot1.wav");
  const [ biceps, setBiceps ] = useState([]);
  const timer = useRef(false);

  const generateBicep = () => {
    const randX = Math.random() * 80 + 20;
    const randY = Math.random() * -150 - 50;

    return (
      <Motion
        defaultStyle={{ x: 0, y: 0, opacity: 2 }}
        style={{
          x: spring(randX, { stiffness: 75, damping: 25 }),
          y: spring(randY, { stiffness: 25, damping: 15 }),
          opacity: spring(0, { stiffness: 20, damping: 15 })
        }}
      >
        {(style) => (
          <BicepParticle
            reactMotionStyles={{
              opacity: style.opacity,
              transform: `translate(${style.x}px, ${style.y}px)`
            }}
          />
        )}
      </Motion>
    );
  };

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
    <button className={`PlusRepBtn`} onClick={handleClick} >
      <FontAwesomeIcon icon={faPlus} color={colors.doYouEvenLift}/>
      {
        biceps.map((bicep) => bicep)
      }
    </button>
  );
}

export default PlusRepBtn;
