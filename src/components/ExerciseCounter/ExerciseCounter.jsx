import React, { useState, useEffect } from 'react';
import {
  PlusRepBtn,
  ProgressBar,
  ProgressCount,
} from 'components';

function ExerciseCounter({ exercise, gamestate, id, name, setIsSavingScores }) {
  const [ reps, setReps ] = useState(0);

  // TODO FIXME  i think there will be race conditions and over writes when try to send new reps and recieve cron job reps at around the same time

  const getCompletedReps = (player, exercise) => {
    const playerIndex = gamestate.players.findIndex((e) => e.name === player);
    const exerciseIndex = gamestate.players[playerIndex].exercises.findIndex((e) => e.name === exercise);
    const completedReps = gamestate.players[playerIndex].exercises[exerciseIndex].completedReps;

    return completedReps;
  };

  useEffect(() => {
    setReps(getCompletedReps(name, exercise.name));
  }, [gamestate]);

  return (
    <div className="ExerciseCounter">
      <PlusRepBtn
        exercise={exercise.name}
        id={id}
        maxReps={exercise.reps}
        player={name}
        reps={reps}
        setIsSavingScores={setIsSavingScores}
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
