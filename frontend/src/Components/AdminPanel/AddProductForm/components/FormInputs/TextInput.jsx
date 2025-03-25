import React from 'react';
import classes from '../../AddProductForm.module.css';

const TextInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  error, 
  required = false 
}) => {
  return (
    <div className={classes['form-group']}>
      <label htmlFor={name}>{label} {required && '*'}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? classes['input-error'] : ''}
      />
      {error && <p className={classes['error-message']}>{error}</p>}
    </div>
  );
};

export default TextInput;