import React from 'react';
import { GeneralBtn } from 'components';
import { useHistory } from 'react-router-dom';

function Banner(props) {
  const { isOnGamePage } = props;
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
      <p>Keep the health of you and your friends in check during self-isolation or quarantine. Set exercise rep counts to hit daily!</p>
    </header>
  );
}

export default Banner;
