import React from 'react';

const FormErrorMsg = ({ error }) => (
  error ?
  <p>* {error.message}</p> :
  null
)

export default FormErrorMsg;
