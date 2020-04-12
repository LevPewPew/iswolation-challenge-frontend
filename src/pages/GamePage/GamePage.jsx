import React, { useEffect } from 'react';
import { PlayerRow } from 'components';
import { useState } from 'react';
import axios from 'axios';

function GamePage(props) {
  const { setIsOnGamePage } = props;
  const [ data, setData ] = useState(null);

  const getData = async () => {
    const gameId = '5e911fbfeac7e32999e1c0e7';

    try {
      const res = await axios.get(`http://localhost:5009/games/${gameId}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsOnGamePage(true);
    getData();
  }, [])

  return (
    <main className="GamePage">
      <div className="player-row-container">
        {
          data ? 
          data.players.map((player, index) => {
            return (
              <PlayerRow
                data={data}
                key={index}
                playerIndex={index}
                playerName={player}
              />
            );
          }) :
          null
        }
      </div>
    </main>
  );
}

export default GamePage;
