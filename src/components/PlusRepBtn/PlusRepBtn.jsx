import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { environment } from 'config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BicepParticle } from 'components';
import { colors } from 'styles';

const { WEB_SERVER } = environment;

function PlusRepBtn({ id, exercise, maxReps, player, setReps, reps }) {
  const audio = new Audio("https://lev-webdev-assets-123098.s3-ap-southeast-2.amazonaws.com/gunshot1.wav");
  const [ biceps, setBiceps ] = useState([]);
  const bicepTimer = useRef(false);
  const scoreUpdateTimer = useRef(false);
  const firstUpdate = useRef(true);

  const handleClick = async () => {
    if (reps < maxReps) {
      const newBiceps = biceps;
      newBiceps.push(
        <BicepParticle
          key={`particle_${new Date().getTime()}`}
        />
      );
      setBiceps(newBiceps);
      clearTimeout(bicepTimer.current);
      bicepTimer.current = setTimeout(() => setBiceps([]), 5000);

      setReps(reps + 1);
    }
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      if (reps < maxReps) {
        audio.play();
      }
  
      clearTimeout(scoreUpdateTimer.current);
      scoreUpdateTimer.current = setTimeout(async () => {
        const newGains = {
          player,
          exercise,
          completedReps: reps
        };
        try {
          await axios.put(`${WEB_SERVER}/gamestates/${id}/add-gains`, newGains);
        } catch (err) {
          console.log(err);
        }
      }, 2000);
    }
  }, [reps]);

  return (
    <button className={`PlusRepBtn`} onClick={handleClick}>
      <FontAwesomeIcon icon={faPlus} color={colors.doYouEvenLift} />
      {biceps.map((bicep) => bicep)}
    </button>
  );
}

export default PlusRepBtn;
