import React from 'react';
import { useHistory } from 'react-router-dom';
import { GeneralBtn } from 'components';

const APP_DESCRIPTION = `
Keep the health of you and your friends in check during self-isolation or quarantine. Set exercises with rep counts to hit daily! Micro-workouts spread through out the day, or one longer session, are both great options.
`

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
