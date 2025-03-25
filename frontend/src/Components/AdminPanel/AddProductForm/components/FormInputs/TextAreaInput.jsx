import React from 'react';
import classes from '../../AddProductForm.module.css';

const TextAreaInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  error, 
  required = false,
  rows = 4 
}) => {
  return (
    <div className={classes['form-group']}>
      <label htmlFor={name}>{label} {required && '*'}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={error ? classes['input-error'] : ''}
      />
      {error && <p className={classes['error-message']}>{error}</p>}
    </div>
  );
};

export default TextAreaInput;