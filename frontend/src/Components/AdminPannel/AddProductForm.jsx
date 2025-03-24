import React, { useState } from 'react'
import classes from './AddProductForm.module.css'
import Button from '../SharedComps/Button'
import { useMutation } from '@tanstack/react-query'
import { addProduct, queryClient } from '../../util/http'

const AddProductForm = () => {
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL'];
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    currentPrice: '',
    oldPrice: '',
    imageUrl: '',
    sizes: [],
    bestSeller: false
  });

  const { mutate, isLoading, error } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'bestSeller') {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      } else if (name === 'sizes') {
        const updatedSizes = [...formData.sizes];
        if (checked) {
          updatedSizes.push(value);
        } else {
          const index = updatedSizes.indexOf(value);
          if (index > -1) {
            updatedSizes.splice(index, 1);
          }
        }
        setFormData(prev => ({
          ...prev,
          sizes: updatedSizes
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.currentPrice) {
      newErrors.currentPrice = 'Current price is required';
    } else if (isNaN(formData.currentPrice) || Number(formData.currentPrice) <= 0) {
      newErrors.currentPrice = 'Price must be a positive number';
    }

    if(isNaN(formData.oldPrice) || Number(formData.oldPrice) < 0){
      newErrors.oldPrice = 'Old price must be a positive number or null';
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    }
    
    if (formData.sizes.length === 0) {
      newErrors.sizes = 'At least one size must be selected';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      mutate(formData);
      
      if(error){
        setErrors(prev => ({
          ...prev,
          submit: error.message || 'Failed to add product. Please try again.'
        }));
        return;
      }
      
      if(!error && !isLoading) {
        // Reset form
        setFormData({
          name: '',
          description: '',
          currentPrice: '',
          oldPrice: '',
          imageUrl: '',
          sizes: [],
          bestSeller: false
        });

        setErrors({});
      }
    }
  };

  // Show loading state in the component render
  if(isLoading) {
    return <p>Adding product...</p>;
  }
  
  return (
    <div className={classes.container}>
      <form className={classes['product-form']} onSubmit={handleSubmit}>
        <h2>Add New Product</h2>
        
        <div className={classes['form-group']}>
          <label htmlFor="name">Product Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name" 
            className={errors.name ? classes['input-error'] : ''}
          />
          {errors.name && <p className={classes['error-message']}>{errors.name}</p>}
        </div>
        
        <div className={classes['form-group']}>
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description" 
            rows="4"
            className={errors.description ? classes['input-error'] : ''}
          ></textarea>
          {errors.description && <p className={classes['error-message']}>{errors.description}</p>}
        </div>
        
        <div className={classes['form-row']}>
          <div className={classes['form-group']}>
            <label htmlFor="currentPrice">Current Price ($)</label>
            <input 
              type="number" 
              id="currentPrice" 
              name="currentPrice" 
              value={formData.currentPrice}
              onChange={handleChange}
              placeholder="0.00" 
              step="0.01" 
              className={errors.currentPrice ? classes['input-error'] : ''}
            />
            {errors.currentPrice && <p className={classes['error-message']}>{errors.currentPrice}</p>}
          </div>
          
          <div className={classes['form-group']}>
            <label htmlFor="oldPrice">Old Price ($)</label>
            <input 
              type="number" 
              id="oldPrice" 
              name="oldPrice" 
              value={formData.oldPrice}
              onChange={handleChange}
              placeholder="0.00" 
              step="0.01" 
            />
            {errors.oldPrice && <p className={classes['error-message']}>{errors.oldPrice}</p>}
          </div>
        </div>
        
        <div className={classes['form-group']}>
          <label htmlFor="imageUrl">Image URL</label>
          <input 
            type="text" 
            id="imageUrl" 
            name="imageUrl" 
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL" 
            className={errors.imageUrl ? classes['input-error'] : ''}
          />
          {errors.imageUrl && <p className={classes['error-message']}>{errors.imageUrl}</p>}
        </div>
        
        <div className={classes['form-group']}>
          <label>Available Sizes</label>
          <div className={classes['sizes-group']}>
            {availableSizes.map((size) => (
              <div key={size} className={classes['size-checkbox']}>
                <input
                  type="checkbox"
                  id={`size-${size}`}
                  name="sizes"
                  value={size}
                  checked={formData.sizes.includes(size)}
                  onChange={handleChange}
                />
                <label htmlFor={`size-${size}`} className={errors.sizes ? classes['size-error'] : ''}>{size}</label>
              </div>
            ))}
          </div>
          {errors.sizes && <p className={classes['error-message']}>{errors.sizes}</p>}
        </div>
        
        <div className={classes['form-checkbox']}>
          <input 
            type="checkbox" 
            id="bestSeller" 
            name="bestSeller" 
            checked={formData.bestSeller}
            onChange={handleChange}
          />
          <label htmlFor="bestSeller">Mark as Best Seller</label>
        </div>
        
        {errors.submit && (
          <div className={classes['submit-error']}>
            {errors.submit}
          </div>
        )}
        
        <Button type="submit" className={classes['submit-btn']} disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Product'}
        </Button>
      </form>
    </div>
  )
}

export default AddProductForm
