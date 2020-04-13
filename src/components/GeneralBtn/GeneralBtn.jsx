import React from 'react';

const GeneralBtn = ({ onClick, text }) => (
  <button className="GeneralBtn" onClick={onClick} type="button">
    <h2>{text}</h2>
  </button>
);

export default GeneralBtn;
