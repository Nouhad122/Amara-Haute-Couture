import React from 'react';
import classes from '../../AddProductForm.module.css';

const CheckboxGroup = ({ 
  label, 
  options, 
  selectedValues, 
  onChange, 
  error, 
  required = false 
}) => {
  return (
    <div className={classes['form-group']}>
      <label>{label} {required && '*'}</label>
      <div className={classes['sizes-group']}>
        {options.map((option) => (
          <div key={option} className={classes['size-checkbox']}>
            <input
              type="checkbox"
              id={`size-${option}`}
              name="sizes"
              value={option}
              checked={selectedValues.includes(option)}
              onChange={onChange}
            />
            <label 
              htmlFor={`size-${option}`} 
              className={error ? classes['size-error'] : ''}
            >
              {option}
            </label>
          </div>
        ))}
      </div>
      {error && <p className={classes['error-message']}>{error}</p>}
    </div>
  );
};

export default CheckboxGroup;