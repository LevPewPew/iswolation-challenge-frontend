import React, { useState, useRef } from 'react';
import axios from 'axios';
import { environment, timing } from 'config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BicepParticle } from 'components';
import { colors } from 'styles';

const { WEB_SERVER } = environment;
const { BICEP_CLEAR } = timing;

function PlusRepBtn({ id, exercise, maxReps, player, setIsSavingScores, setReps, reps }) {
  const [ biceps, setBiceps ] = useState([]);
  const bicepTimer = useRef(false);

  const handleClick = async () => {
    const newReps = reps + 1;
    if (newReps <= maxReps) {
      let audio;
      if (newReps === maxReps) {
        audio = new Audio("https://lev-webdev-assets-123098.s3-ap-southeast-2.amazonaws.com/gunshot3.ogg");
      } else {
        audio = new Audio("https://lev-webdev-assets-123098.s3-ap-southeast-2.amazonaws.com/gunshot1.wav");
      }
      const newBiceps = biceps;
      newBiceps.push(
        <BicepParticle
          key={`particle_${new Date().getTime()}`}
        />
      );
      setBiceps(newBiceps);
      clearTimeout(bicepTimer.current);
      bicepTimer.current = setTimeout(() => setBiceps([]), BICEP_CLEAR);

      setReps(newReps);
      audio.play();

      const newGains = {
        player,
        exercise,
        completedReps: newReps
      };
      try {
        await axios.put(`${WEB_SERVER}/gamestates/${id}/add-gains`, newGains);
        setIsSavingScores(Date.now());
      } catch (err) {
        setIsSavingScores(-1);
        console.log(err);
      }
    }
  };

  return (
    <button className="PlusRepBtn" onClick={handleClick} disabled={reps === maxReps}>
      <FontAwesomeIcon icon={faPlus} color={colors.doYouEvenLift} />
      {biceps.map((bicep) => bicep)}
    </button>
  );
}

export default PlusRepBtn;
