import React from 'react';

function IncDecBtn(props) {
  const { action, icon, max, min, stateValue } = props;

  const handleClick = () => {
    action();
  }

  return (
    <button className="IncDecBtn" onClick={handleClick}>
      {icon()}
    </button>
  );
}

export default IncDecBtn;
