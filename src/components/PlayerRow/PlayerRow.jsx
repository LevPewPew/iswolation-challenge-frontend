import React from 'react';
import {
  ExerciseCounter,
  PlayerCard,
} from 'components';

const PlayerRow = ({ data, id, playerName }) => (
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
              exercise={exercise}
              id={id}
              name={playerName}
            />
          );
        }) :
        null
      }
    </div>
  </article>
);

export default PlayerRow;
