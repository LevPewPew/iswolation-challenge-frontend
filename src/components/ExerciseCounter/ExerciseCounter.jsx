import React, { useState } from 'react';
import {
  PlusRepBtn,
  ProgressBar,
  ProgressCount,
} from 'components';

function ExerciseCounter({ exercise, id, name }) {
  const [ reps, setReps ] = useState(0);
  
  return (
    <div className="ExerciseCounter">
      <PlusRepBtn
        exercise={exercise.name}
        id={id}
        maxReps={exercise.reps}
        player={name}
        reps={reps}
        setReps={setReps}
      />
    {/* // TODO, pass the player and the exercise down to this level, and then use this to query the gameState collection to GET new completedReps */}
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
