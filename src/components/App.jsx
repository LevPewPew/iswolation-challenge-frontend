import React from 'react';
import { GamePage, MainPage } from 'pages';
import { Banner, Footer } from 'components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss'

function App() {
  return (
    <div className="App">
      <Banner />
      <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage /> 
        </Route>
        <Route path="/game">
          <GamePage />
        </Route>
      </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
