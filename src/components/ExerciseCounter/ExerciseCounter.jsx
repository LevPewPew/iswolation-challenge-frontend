import React, { useState } from 'react';
import {
  PlusRepBtn,
  ProgressBar,
  ProgressCount,
} from 'components';

function ExerciseCounter(props) {
  const [ reps, setReps ] = useState(0);
  const { exercise, exerciseIndex, playerIndex } = props;
  
  return (
    <div className="ExerciseCounter">
      <PlusRepBtn
        exerciseIndex={exerciseIndex}
        maxReps={exercise.maxReps}
        playerIndex={playerIndex}
        reps={reps}
        setReps={setReps}
      />
      <ProgressBar
        maxReps={exercise.maxReps}
        name={exercise.name}
        reps={reps}
      />
      <ProgressCount
        maxReps={exercise.maxReps}
        reps={reps}
      />
    </div>
  );
}

export default ExerciseCounter;
