import React, { useEffect } from 'react';
import { NewGameForm } from 'components';

function MainPage({ setIsOnGamePage }) {
  useEffect(() => {
    setIsOnGamePage(false);
  }, []);

  return (
    <main className="MainPage">
      <NewGameForm />
    </main>
  );
}

export default MainPage;
