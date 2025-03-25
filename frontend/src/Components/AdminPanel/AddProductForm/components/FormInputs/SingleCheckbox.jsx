import React from 'react';
import classes from '../../AddProductForm.module.css';

const SingleCheckbox = ({ 
  label, 
  name, 
  checked, 
  onChange 
}) => {
  return (
    <div className={classes['form-checkbox']}>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default SingleCheckbox;