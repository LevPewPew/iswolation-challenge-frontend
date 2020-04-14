import React from 'react';
import { useHistory } from 'react-router-dom';
import { GeneralBtn } from 'components';
import { text } from 'config';

const { APP_DESCRIPTION } = text;

function Banner({ isOnGamePage }) {
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

  return (
    <header className="Banner">
      <div className="h1-button-container">
        <h1 className="h1-plus">Iswolation Challenge</h1>
        {
          isOnGamePage ?
          <GeneralBtn 
            text="New Challenge"
            onClick={handleClick}
          /> :
          null
        }
      </div>
      <p>{APP_DESCRIPTION}</p>
    </header>
  );
}

export default Banner;
