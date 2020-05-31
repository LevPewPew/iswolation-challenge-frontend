import React from 'react';

const GeneralBtn = ({ motionStyle, onClick, text }) => (
  <button className="GeneralBtn" onClick={onClick} type="button" style={motionStyle}>
    <span>{text}</span>
  </button>
);

export default GeneralBtn;
