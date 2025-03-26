import React, { forwardRef } from 'react';
import classes from '../../AddProductForm.module.css';

const FileInput = forwardRef(({
  label,
  id = "files",
  name = "files",
  onChange,
  error,
  required = false,
  accept = "image/*,video/*",
  multiple = true
}, ref) => {
  return (
    <div className={classes['form-group']}>
      <label htmlFor={id}>{label} {required && '*'}</label>
      <input
        type="file"
        id={id}
        name={name}
        onChange={onChange}
        multiple={multiple}
        accept={accept}
        className={error ? classes['input-error'] : ''}
        ref={ref}
      />
      {error && <p className={classes['error-message']}>{error}</p>}
    </div>
  );
});

export default FileInput;