import React, { useState } from 'react';
import {
  PlusRepBtn,
  ProgressBar,
  ProgressCount,
} from 'components';

function ExerciseCounter({ exercise, exerciseIndex, playerIndex }) {
  const [ reps, setReps ] = useState(0);
  
  return (
    <div className="ExerciseCounter">
      <PlusRepBtn
        exerciseIndex={exerciseIndex}
        maxReps={exercise.reps}
        playerIndex={playerIndex}
        reps={reps}
        setReps={setReps}
      />
      <ProgressBar
        maxReps={exercise.reps}
        name={exercise.name}
        reps={reps}
      />
      <ProgressCount
        maxReps={exercise.reps}
        reps={reps}
      />
    </div>
  );
}

export default ExerciseCounter;
