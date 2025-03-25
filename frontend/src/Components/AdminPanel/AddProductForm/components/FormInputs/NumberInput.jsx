import React from 'react';
import classes from '../../AddProductForm.module.css';

const NumberInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder = "0.00", 
  error, 
  required = false,
  step = "0.01" 
}) => {
  return (
    <div className={classes['form-group']}>
      <label htmlFor={name}>{label} {required && '*'}</label>
      <input
        type="number"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        step={step}
        className={error ? classes['input-error'] : ''}
      />
      {error && <p className={classes['error-message']}>{error}</p>}
    </div>
  );
};

export default NumberInput;