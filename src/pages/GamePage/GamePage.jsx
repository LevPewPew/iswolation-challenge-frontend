import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { GeneralBtn, PlayerRow } from 'components';
import { environment } from 'config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { animated as a, useChain, useSpring } from 'react-spring';
import { colors } from 'styles';

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

  const slabFallSpring = {
    from: {
      z: 50
    },
    to: {
      z: 1
    },
    config: {
      tension: 210,
      friction: 20,
      mass: 50,
      clamp: true
    }
  };
  const slabImpactSpring = {
    from: {
      xImpact: 50
    },
    to: {
      xImpact: 1
    },
    config: {
      tension: 210,
      friction: 20,
      mass: 50,
      clamp: true
    }
  };
  const slabSettleSpring = {
    from: {
      xSettle: 50
    },
    to: {
      xSettle: 1
    },
    config: {
      tension: 210,
      friction: 20,
      mass: 50,
      clamp: true
    }
  };
  const slabFallRef = useRef();
  const slabImpactRef = useRef();
  const slabSettleRef = useRef();
  const { z } = useSpring({
      ref: slabFallRef,
      ...slabFallSpring
  });
  const { xImpact } = useSpring({
      ref: slabImpactRef,
      ...slabImpactSpring
  });
  const { xSettle } = useSpring({
      ref: slabSettleRef,
      ...slabSettleSpring
  });
  useChain([slabFallRef, slabImpactRef, slabSettleRef]);
  const slabFallStyle = {
    transform: z.interpolate((z) => `scale(${z})`),
    transformOrigin: "50% 50%"
  };
  const slabFallStyle = {
    transform: z.interpolate((z) => `scale(${z})`),
    transformOrigin: "50% 50%"
  };
  const slabFallStyle = {
    transform: z.interpolate((z) => `scale(${z})`),
    transformOrigin: "50% 50%"
  };

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
          // TODO LEFTOFF, put the extra two div wrappers here
          <a.div
            className="player-row-container"
            style={slabFallStyle}
          >
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
          </a.div>
        </> :
        null
      }
    </main>
  );
}

export default GamePage;
