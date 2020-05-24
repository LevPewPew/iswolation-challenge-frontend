import React from 'react';
import {
  ExerciseCounter,
  PlayerCard,
} from 'components';

const PlayerRow = ({ data, gamestate, id, playerName, setIsSavingScores }) => (
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
              exercise={exercise}
              gamestate={gamestate}
              id={id}
              key={i}
              name={playerName}
              setIsSavingScores={setIsSavingScores}
            />
          );
        }) :
        null
      }
    </div>
  </article>
);

export default PlayerRow;
