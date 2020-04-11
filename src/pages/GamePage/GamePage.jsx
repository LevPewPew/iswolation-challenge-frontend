import React, { useEffect } from 'react';
import { PlayerRow } from 'components';

const data = [
  {
    name: "Lev"
  },
  {
    name: "Big Andy"
  },
  {
    name: "André Bandeira"
  },
  {
    name: 'Ian "Forearms" McClaren'
  },
  {
    name: 'Akiv'
  },
  {
    name: 'Toigo'
  },
]

function GamePage(props) {
  const { setIsOnGamePage } = props;

  useEffect(() => {
    setIsOnGamePage(true);
  }, [])

  return (
    <main className="GamePage">
      <div className="player-row-container">
        {
          data.map((datum, index) => {
            return (
              <PlayerRow
                key={index}
                playerIndex={index}
                playerName={datum.name}
              />
            );
          })
        }
      </div>
    </main>
  );
}

export default GamePage;
