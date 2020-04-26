import React from 'react';

const GeneralBtn = ({ motionStyle, onClick, text }) => (
  <button className="GeneralBtn" onClick={onClick} type="button" style={motionStyle}>
    <h2>{text}</h2>
  </button>
);

export default GeneralBtn;
