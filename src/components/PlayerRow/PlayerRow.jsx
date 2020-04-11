import React from 'react';
import {
  ExerciseCounter,
  PlayerCard,
} from 'components';

// TODO change to come from store when db document is created
const exercises = [
  {
    name: "Push Ups",
    maxReps: 12,
  },
  {
    name: "Crunches",
    maxReps: 8
  },
]

function PlayerRow(props) {
  const { playerIndex, playerName } = props;

  return (
    <article className="PlayerRow">
      <PlayerCard
        name={playerName}
      />
      <div className="exercise-counters">
        {
          exercises.map((exercise, index) => {
            return (
              <ExerciseCounter
                key={index}
                exerciseIndex={index}
                exercise={exercise}
                playerIndex={playerIndex}
              />
            )
          })
        }
      </div>
    </article>
  );
}

export default PlayerRow;
