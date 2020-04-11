import React from 'react';
import { GamePage, MainPage } from 'pages';
import { Banner, Footer } from 'components';
import './App.scss'

function App() {
  return (
    <div className="App">
      <Banner />
      <MainPage />
      <GamePage />
      <Footer />
    </div>
  );
}

export default App;
