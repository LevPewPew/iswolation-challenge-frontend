import React from 'react';
import _ from 'lodash';

function NumberInput({ name, register }) {
  const createPlaceholderFromName = (name) => (_.startCase(name));

  return (
    <input className="NumberInput" type="number" placeholder={createPlaceholderFromName(name)} name={name} ref={register}/>
  );
}

export default NumberInput;
