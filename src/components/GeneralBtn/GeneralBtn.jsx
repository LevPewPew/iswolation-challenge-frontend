import React from 'react';

const GeneralBtn = ({ onClick, text }) => (
  <button className="GeneralBtn" onClick={onClick} type="button">
    <span>{text}</span>
  </button>
);

export default GeneralBtn;
