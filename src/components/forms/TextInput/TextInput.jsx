import React from 'react';
import _ from 'lodash';

function TextInput(props) {
  const { name, register } = props;

  const createPlaceholderFromName = (name) => (_.startCase(name));

  return (
    <input className="TextInput" type="text" placeholder={createPlaceholderFromName(name)} name={name} ref={register} />
  );
}

export default TextInput;
