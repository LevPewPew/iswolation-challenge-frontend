import React from 'react';
import _ from 'lodash';

function TextInput({ autoFocus, name, register, maxLength }) {
  const createPlaceholderFromName = (name) => (_.startCase(name));

  return (
    <input className="TextInput" type="text" maxLength={maxLength} placeholder={createPlaceholderFromName(name)} name={name} ref={register} autoFocus={autoFocus}/>
  );
}

TextInput.defaultProps = {
  maxLength: 524288 // the default html tag value
}

export default TextInput;
