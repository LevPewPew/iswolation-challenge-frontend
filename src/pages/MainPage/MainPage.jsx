import React, { useEffect } from 'react';
import { NewGameForm } from 'components';

function MainPage(props) {
  const { setIsOnGamePage } = props;

  useEffect(() => {
    setIsOnGamePage(false);
  }, [])

  return (
    <main className="MainPage">
      <NewGameForm />
    </main>
  );
}

export default MainPage;
