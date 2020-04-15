import React from 'react';
import _ from 'lodash';

function NumberInput({ name, register, min, max }) {
  const createPlaceholderFromName = (name) => (_.startCase(name));

  return (
    <input className="NumberInput" type="number" min={min} max={max} placeholder={createPlaceholderFromName(name)} name={name} ref={register}/>
  );
}

NumberInput.defaultProps = {
  min: -1000000, // the default html tag value
  max: 1000000 // the default html tag value
}

export default NumberInput;
