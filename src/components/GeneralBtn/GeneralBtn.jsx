import React from 'react';

function GeneralBtn(props) {
  const { onClick, text } = props;

  return (
    <button
      className="GeneralBtn"
      onClick={onClick}
      type="button"
    >
      <h2>{text}</h2>
    </button>
  );
}

export default GeneralBtn;
