import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { GeneralBtn, PlayerRow } from 'components';
import { environment } from 'config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { colors } from 'styles';
import { ArrowMotion, SlabSlamMotion } from 'animations';

const { REACT_SERVER, WEB_SERVER } = environment;

function GamePage({ setIsOnGamePage }) {
  const [ data, setData ] = useState(null);
  const { id } = useParams();
  const gameAddress = `${REACT_SERVER}/${id}`;
  
  const copyIcon = <FontAwesomeIcon icon={faCopy} color={colors.gainsvilleFurniture} />;
  
  useEffect(() => {
    const gameDataAddress = `${WEB_SERVER}/games/${id}`

    const getData = async () => {
      try {
        const res = await axios.get(gameDataAddress);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    
    setIsOnGamePage(true);
    getData();
  }, [id, setIsOnGamePage]);

  return (
    <main className="GamePage">
      {
        data ?
        <>
          <h1>{data.groupName}</h1>
          <div className="label-btn-container">
            <label>Copy Challenge Link</label>
            <CopyToClipboard
              text={gameAddress}
            >
              <GeneralBtn
                text={copyIcon}
              />
            </CopyToClipboard>
          </div>
          <SlabSlamMotion>
            <div className="player-row-container">
              {
                data.players.map((player, i) => {
                  return (
                    <PlayerRow
                      data={data}
                      key={i}
                      playerIndex={i}
                      playerName={player}
                    />
                  );
                })
              }
            </div>
          </SlabSlamMotion>
        </> :
        null
      }
    </main>
  );
}

export default GamePage;
