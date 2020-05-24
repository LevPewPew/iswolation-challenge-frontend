import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { GeneralBtn, PlayerRow } from 'components';
import { environment, timing } from 'config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { animated as a } from 'react-spring';
import { colors } from 'styles';

const { REACT_SERVER, WEB_SERVER } = environment;
const { SERVER_DATA_SYNC, STATS_AUTO_SAVE } = timing;

function GamePage({ setIsOnGamePage, slabFallStyle }) {
  const [ data, setData ] = useState(null);
  const [ isSavingScores, setIsSavingScores ] = useState(false);
  const { id } = useParams();
  const scoreSavingTimer = useRef(false);
  const gameAddress = `${REACT_SERVER}/${id}`;
  
  const copyIcon = <FontAwesomeIcon icon={faCopy} color={colors.gainsvilleFurniture} />;
  
  useEffect(() => {
    const gameDataAddress = `${WEB_SERVER}/games/${id}`;
    const gamestateDataAddress = `${WEB_SERVER}/gamestates/${id}`;

    const getData = async () => {
      if (!isSavingScores) {
        try {
          const gameResponse = await axios.get(gameDataAddress);
          const gamestateResponse = await axios.get(gamestateDataAddress);
          setData({game: gameResponse.data, gamestate: gamestateResponse.data});
        } catch (err) {
          console.log(err);
        }
      }
    };
    
    setIsOnGamePage(true);
    getData();
    setInterval(() => getData(), SERVER_DATA_SYNC);
  }, []);

  useEffect(() => {
    if (isSavingScores) {
      clearTimeout(scoreSavingTimer.current);
      scoreSavingTimer.current = setTimeout(() => {
        setIsSavingScores(false);
      }, STATS_AUTO_SAVE);
    }
  }, [isSavingScores]);

  return (
    <main className="GamePage">
      {
        data ?
        <>
          <h1>{data.game.groupName}</h1>
          <div className="label-btn-container">
            {
              isSavingScores ?
              <span className="saving-stats">{isSavingScores === -1 ? "Stats save failed" : "Saving stats ..."}</span> :
              <span className="stats-are-saved">Stats are saved!</span>
            }
            <label>Copy Challenge Link</label>
            <CopyToClipboard
              text={gameAddress}
            >
              <GeneralBtn
                text={copyIcon}
              />
            </CopyToClipboard>
          </div>
          <a.div
            className="player-row-container"
            style={slabFallStyle}
          >
            {
              data.game.players.map((player, i) => {
                return (
                  <PlayerRow
                    gamestate={data.gamestate}
                    data={data}
                    id={id}
                    key={i}
                    playerName={player}
                    setIsSavingScores={setIsSavingScores}
                  />
                );
              })
            }
          </a.div>
        </> :
        null
      }
    </main>
  );
}

export default GamePage;
