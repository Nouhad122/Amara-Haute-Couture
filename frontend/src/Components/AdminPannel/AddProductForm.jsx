import React, { useState, useEffect } from 'react'
import classes from './AddProductForm.module.css'
import Button from '../SharedComps/Button'
import { useMutation } from '@tanstack/react-query'
import { addProduct, updateProduct, queryClient } from '../../util/http'

const AddProductForm = ({ editingProduct, onCancelEdit }) => {
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL'];
  const [errors, setErrors] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  
  const initialFormState = {
    name: '',
    category: '',
    description: '',
    currentPrice: '',
    oldPrice: '',
    sizes: [],
    bestSeller: false
  };
  
  const [formData, setFormData] = useState(initialFormState);

  // Effect to update form when editingProduct changes
  useEffect(() => {
    if (editingProduct) {
      // Update form data
      setFormData({
        name: editingProduct.name || '',
        category: editingProduct.category || '',
        description: editingProduct.description || '',
        currentPrice: editingProduct.currentPrice || '',
        oldPrice: editingProduct.oldPrice || '',
        sizes: editingProduct.availableSizes || [], // Update to use availableSizes
        bestSeller: editingProduct.bestSeller || false
      });

      // Handle media files
      if (editingProduct.media && editingProduct.media.length > 0) {
        // Create preview URLs for existing media
        const urls = editingProduct.media.map(media => `http://localhost:3000${media.url}`);
        setPreviewUrls(urls);

        // Fetch the files from URLs and create File objects
        Promise.all(
          editingProduct.media.map(async (media) => {
            try {
              const response = await fetch(`http://localhost:3000${media.url}`);
              const blob = await response.blob();
              const fileName = media.url.split('/').pop();
              const fileType = media.type === 'video' ? 'video/mp4' : 'image/jpeg';
              return new File([blob], fileName, { type: fileType });
            } catch (error) {
              console.error('Error fetching media file:', error);
              return null;
            }
          })
        ).then(files => {
          // Filter out any null values from failed fetches
          const validFiles = files.filter(file => file !== null);
          setSelectedFiles(validFiles);
        });
      } else {
        setSelectedFiles([]);
        setPreviewUrls([]);
      }
    } else {
      // Reset form when not editing
      setFormData(initialFormState);
      setSelectedFiles([]);
      setPreviewUrls([]);
    }
  }, [editingProduct]);

  const addMutation = useMutation({
    mutationFn: async (data) => {
      try {
        const formDataToSend = new FormData();
        
        // Append all form fields with proper type conversion
        formDataToSend.append('name', data.name);
        formDataToSend.append('category', data.category);
        formDataToSend.append('description', data.description);
        formDataToSend.append('currentPrice', Number(data.currentPrice).toString());
        formDataToSend.append('oldPrice', data.oldPrice ? Number(data.oldPrice).toString() : '0');
        
        // Convert sizes array to JSON string
        const sizesJson = JSON.stringify(data.sizes || []);
        formDataToSend.append('availableSizes', sizesJson);
        
        formDataToSend.append('bestSeller', data.bestSeller.toString());
        
        // Append all files
        if (selectedFiles.length > 0) {
          selectedFiles.forEach(file => {
            formDataToSend.append('files', file);
          });
        }
        
        return addProduct(formDataToSend);
      } catch (err) {
        console.error('Error preparing form data:', err);
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      // Reset form
      setFormData(initialFormState);
      setSelectedFiles([]);
      setPreviewUrls([]);
      setErrors({});
    },
    onError: (error) => {
      console.error('Add mutation error:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Failed to add product. Please try again.'
      }));
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      try {
        const formDataToSend = new FormData();
        
        // Append all form fields with proper type conversion
        formDataToSend.append('name', data.name);
        formDataToSend.append('category', data.category);
        formDataToSend.append('description', data.description);
        formDataToSend.append('currentPrice', Number(data.currentPrice).toString());
        formDataToSend.append('oldPrice', data.oldPrice ? Number(data.oldPrice).toString() : '0');
        
        // Convert sizes array to JSON string
        const sizesJson = JSON.stringify(data.sizes || []);
        formDataToSend.append('availableSizes', sizesJson);
        
        formDataToSend.append('bestSeller', data.bestSeller.toString());
        
        // Append all files
        if (selectedFiles.length > 0) {
          selectedFiles.forEach(file => {
            formDataToSend.append('files', file);
          });
        }

        // Make sure we have a valid ID
        if (!editingProduct?._id) {
          throw new Error('Product ID is required for updating');
        }
        
        return updateProduct(editingProduct._id, formDataToSend);
      } catch (err) {
        console.error('Error preparing form data:', err);
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      // Reset form and exit edit mode
      setFormData(initialFormState);
      setSelectedFiles([]);
      setPreviewUrls([]);
      setErrors({});
      onCancelEdit();
    },
    onError: (error) => {
      console.error('Update mutation error:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Failed to update product. Please try again.'
      }));
    }
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    
    // Create preview URLs for images
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrls(prev => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'bestSeller') {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      } else if (name === 'sizes') {
        const updatedSizes = [...(formData.sizes || [])];
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

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.currentPrice) {
      newErrors.currentPrice = 'Current price is required';
    } else if (isNaN(formData.currentPrice) || Number(formData.currentPrice) <= 0) {
      newErrors.currentPrice = 'Price must be a positive number';
    }

    if (formData.oldPrice && (isNaN(formData.oldPrice) || Number(formData.oldPrice) < 0)) {
      newErrors.oldPrice = 'Old price must be a positive number or empty';
    }
    
    // Only require files if we're not editing or if we're editing and no files are selected
    if (!editingProduct && selectedFiles.length === 0) {
      newErrors.files = 'At least one image or video is required';
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
      if (editingProduct) {
        updateMutation.mutate(formData);
      } else {
        addMutation.mutate(formData);
      }
    }
  };

  // Show loading state in the component render
  if(addMutation.isLoading || updateMutation.isLoading) {
    return <p>{editingProduct ? 'Updating product...' : 'Adding product...'}</p>;
  }

  return (
    <div className={classes.container}>
      <form className={classes['product-form']} onSubmit={handleSubmit}>
        <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
        
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
          <label htmlFor="category">Category</label>
          <input 
            type="text" 
            id="category" 
            name="category" 
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter product category" 
            className={errors.category ? classes['input-error'] : ''}
          />
          {errors.category && <p className={classes['error-message']}>{errors.category}</p>}
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
          <label htmlFor="files">Product Images & Videos</label>
          <input 
            type="file"
            id="files"
            name="files"
            onChange={handleFileChange}
            multiple
            accept="image/*,video/*"
            className={errors.files ? classes['input-error'] : ''}
          />
          {errors.files && <p className={classes['error-message']}>{errors.files}</p>}
          
          {/* Preview section */}
          {selectedFiles.length > 0 && (
            <div className={classes['preview-container']}>
              {selectedFiles.map((file, index) => (
                <div key={index} className={classes['preview-item']}>
                  {file.type.startsWith('image/') ? (
                    <img 
                      src={previewUrls[index]} 
                      alt={`Preview ${index + 1}`} 
                      className={classes['preview-image']}
                    />
                  ) : (
                    <div className={classes['video-placeholder']}>
                      <span>{file.name}</span>
                    </div>
                  )}
                  <button 
                    type="button" 
                    onClick={() => removeFile(index)}
                    className={classes['remove-file']}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
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
        
        <div className={classes['form-actions']}>
          <Button 
            type="submit" 
            className={classes['submit-btn']} 
            disabled={addMutation.isLoading || updateMutation.isLoading}
          >
            {addMutation.isLoading || updateMutation.isLoading ? 
              (editingProduct ? 'Updating...' : 'Adding...') : 
              (editingProduct ? 'Update Product' : 'Add Product')}
          </Button>
          
          {editingProduct && (
            <Button 
              type="button" 
              className={classes['cancel-btn']} 
              onClick={onCancelEdit}
            >
              Cancel Edit
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

export default AddProductForm
