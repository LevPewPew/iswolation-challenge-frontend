import React, { useState } from 'react';
import { GamePage, MainPage } from 'pages';
import { Banner, Footer } from 'components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss'

function App() {
  const [ isOnGamePage, setIsOnGamePage ] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Banner
          isOnGamePage={isOnGamePage}
        />
        <Switch>
          <Route exact path="/">
            <MainPage
              setIsOnGamePage={setIsOnGamePage}
            /> 
          </Route>
          <Route path="/:id">
            <GamePage
              setIsOnGamePage={setIsOnGamePage}
            />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
