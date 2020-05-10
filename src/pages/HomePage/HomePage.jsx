import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { GeneralBtn } from 'components';

function HomePage({ setIsOnGamePage }) {
  const history = useHistory();

  useEffect(() => {
    setIsOnGamePage(false);
  }, [setIsOnGamePage]);

  const handleClick = () => {
    history.push('/new');
  };

  return (
    <main className="HomePage">
      <GeneralBtn 
        text="Begin"
        onClick={handleClick}
      />
    </main>
  );
}

export default HomePage;
