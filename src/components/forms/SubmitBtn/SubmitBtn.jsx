import React from 'react';

function SubmitBtn(props) {
  const { text } = props;

  return (
    <button
      className="SubmitBtn"
      type="submit"
    >
      <h1>{text}</h1>
    </button>
  );
}

export default SubmitBtn;
