import React from 'react';
import {
  ExerciseCounter,
  PlayerCard,
} from 'components';

const PlayerRow = ({ data, playerIndex, playerName }) => (
  <article className="PlayerRow">
    <PlayerCard
      name={playerName}
    />
    <div className="exercise-counters">
      {
        data ?
        data.exercises.map((exercise, index) => {
          return (
            <ExerciseCounter
              key={index}
              exerciseIndex={index}
              exercise={exercise}
              playerIndex={playerIndex}
            />
          );
        }) :
        null
      }
    </div>
  </article>
);

export default PlayerRow;
