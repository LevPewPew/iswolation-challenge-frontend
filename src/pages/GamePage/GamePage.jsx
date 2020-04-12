import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerRow } from 'components';
import axios from 'axios';

function GamePage(props) {
  const { setIsOnGamePage } = props;
  const [ data, setData ] = useState(null);
  const { id } = useParams();

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:5009/games/${id}`);
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
