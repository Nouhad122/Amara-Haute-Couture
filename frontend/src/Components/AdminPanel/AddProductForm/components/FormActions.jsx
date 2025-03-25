import React from 'react';
import Button from '../../../SharedComps/Button';
import classes from '../AddProductForm.module.css';

const FormActions = ({ 
  isLoading, 
  isEditing, 
  onCancel 
}) => {
  return (
    <div className={classes['form-actions']}>
      <Button
        type="submit"
        className={classes['submit-btn']}
        disabled={isLoading}
      >
        {isLoading
          ? (isEditing ? 'Updating...' : 'Adding...')
          : (isEditing ? 'Update Product' : 'Add Product')}
      </Button>

      {isEditing && (
        <Button
          type="button"
          className={classes['cancel-btn']}
          onClick={onCancel}
        >
          Cancel Edit
        </Button>
      )}
    </div>
  );
};

export default FormActions;