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
        data.game.exercises.map((exercise, i) => {
          return (
            <ExerciseCounter
              key={i}
              exerciseIndex={i}
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
