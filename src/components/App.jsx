import React, { useRef, useState } from 'react';
import { GamePage, HomePage, MainPage } from 'pages';
import { Banner, Footer } from 'components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { animated as a, useChain, useSpring } from 'react-spring';
import './App.scss'

function App() {
  const [ isOnGamePage, setIsOnGamePage ] = useState(false);
  const audio = new Audio("https://lev-webdev-assets-123098.s3-ap-southeast-2.amazonaws.com/heavy-smash-2.wav");

  // TODO so the reason it doesn't all animatte when coming from the fomr rather than a refresh is because this is at the app level, so it is playing "in the background" already and is done by time u get to the game page
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
      mass: 1,
      clamp: true
      // friction: 20 < main
      // friction: 50 , this could be ok as well...
    },
    onRest: () => {
      audio.play();
    }
  };
  const slabImpactSpring = {
    from: {
      xImpact: 0
    },
    to: {
      xImpact: 20
    },
    config: {
      tension: 6400,
      friction: 5,
      clamp: true
    }
  };
  const slabSettleSpring = {
    from: {
      xSettle: 0
    },
    to: {
      xSettle: -20
    },
    config: {
      tension: 6400,
      friction: 5
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
  // have to use this current syntax to get it to work, i don't really understand why. see https://github.com/react-spring/react-spring/issues/574
  useChain([
    {current: slabFallRef.current},
    {current: slabImpactRef.current},
    {current: slabSettleRef.current}
  ]);
  const slabFallStyle = {
    transform: z.interpolate((z) => `scale(${z})`)
  };
  // this width is set to 1px, (and the child div set to 100vw) to avoid having a horizontal scroll occurring due to the existence of these purely for animation divs
  const slabImpactStyle = {
    transform: xImpact.interpolate((x) => `translateX(${x}px)`),
    height: "100%",
    width: "1px"
  };
  const slabSettleStyle = {
    transform: xSettle.interpolate((x) => `translateX(${x}px)`),
    height: "100%",
    width: "100vw"
  };

  return (
    <a.div style={slabImpactStyle}>
      <a.div style={slabSettleStyle}>
        <div className="App">
          {/* must use forceRefresh. do not remove. without forceRefresh, there is an animation bug doing to the animation being split between App and GamePage (the animation will trigger "behind the scenes" when New Challenge is picked and thus is never seen) */}
          <BrowserRouter forceRefresh>
            <Banner
              isOnGamePage={isOnGamePage}
            />
            <Switch>
              <Route exact path="/">
                <HomePage
                  setIsOnGamePage={setIsOnGamePage}
                /> 
              </Route>
              <Route path="/new">
                <MainPage
                  setIsOnGamePage={setIsOnGamePage}
                /> 
              </Route>
              <Route path="/:id">
                <GamePage
                  setIsOnGamePage={setIsOnGamePage}
                  slabFallStyle={slabFallStyle}
                />
              </Route>
            </Switch>
            <Footer />
          </BrowserRouter>
        </div>
      </a.div>
    </a.div>
  );
}

export default App;
