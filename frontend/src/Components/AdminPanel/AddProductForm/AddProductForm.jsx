import React, { useRef } from 'react';
import classes from './AddProductForm.module.css';
import { useProductForm } from '../../../hooks/useProductForm';
import { useProductMutations } from '../../../hooks/useProductMutations';
import TextInput from './components/FormInputs/TextInput';
import TextAreaInput from './components/FormInputs/TextAreaInput';
import NumberInput from './components/FormInputs/NumberInput';
import FileInput from './components/FormInputs/FileInput';
import MediaPreview from './components/MediaPreview';
import CheckboxGroup from './components/FormInputs/CheckboxGroup';
import SingleCheckbox from './components/FormInputs/SingleCheckbox';
import FormActions from './components/FormActions';

const AddProductForm = ({ editingProduct, onCancelEdit }) => {
  // Create a ref for the file input
  const fileInputRef = useRef(null);
  
  // Use the custom hook for form state management
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    selectedFiles,
    setSelectedFiles,
    previewUrls,
    setPreviewUrls,
    validateForm,
    resetForm
  } = useProductForm(editingProduct);

  // Use the custom hook for mutations
  const { addMutation, updateMutation } = useProductMutations({
    onSuccess: () => {
      resetForm();
      // Reset the file input to clear "No file chosen" text
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      if (editingProduct) onCancelEdit();
    },
    onError: (error) => {
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Failed to complete operation. Please try again.'
      }));
    },
    selectedFiles
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      if (editingProduct) {
        updateMutation.mutate({
          productId: editingProduct._id,
          data: formData
        });
      } else {
        addMutation.mutate(formData);
      }
    }
  };

  if (addMutation.isLoading || updateMutation.isLoading) {
    return <p>{editingProduct ? 'Updating product...' : 'Adding product...'}</p>;
  }

  return (
    <div className={classes.container}>
      <form className={classes['product-form']} onSubmit={handleSubmit}>
        <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>

        <TextInput
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        <TextInput
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          error={errors.category}
          required
        />

        <TextAreaInput
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          required
        />

        <div className={classes['form-row']}>
          <NumberInput
            label="Current Price ($)"
            name="currentPrice"
            value={formData.currentPrice}
            onChange={handleChange}
            error={errors.currentPrice}
            required
          />

          <NumberInput
            label="Old Price ($)"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            error={errors.oldPrice}
          />
        </div>

        <div className={classes['form-row']}>
          <TextInput
            label="Material"
            name="material"
            value={formData.material}
            onChange={handleChange}
            error={errors.material}
            required
          />

          <TextInput
            label="Care Instructions"
            name="careInstructions"
            value={formData.careInstructions}
            onChange={handleChange}
            error={errors.careInstructions}
            required
          />
        </div>

        <FileInput
          label="Product Images & Videos"
          onChange={handleFileChange}
          error={errors.files}
          required={!editingProduct}
          ref={fileInputRef}
        />

        {selectedFiles.length > 0 && (
          <MediaPreview
            files={selectedFiles}
            previewUrls={previewUrls}
            onRemove={(index) => {
              setSelectedFiles(prev => prev.filter((_, i) => i !== index));
              setPreviewUrls(prev => prev.filter((_, i) => i !== index));
            }}
          />
        )}

        <CheckboxGroup
          label="Available Sizes"
          options={['XS', 'S', 'M', 'L', 'XL']}
          selectedValues={formData.sizes}
          onChange={handleChange}
          error={errors.sizes}
          required
        />

        <SingleCheckbox
          label="Mark as Best Seller"
          name="bestSeller"
          checked={formData.bestSeller}
          onChange={handleChange}
        />

        {errors.submit && (
          <div className={classes['submit-error']}>
            {errors.submit}
          </div>
        )}

        <FormActions
          isLoading={addMutation.isLoading || updateMutation.isLoading}
          isEditing={!!editingProduct}
          onCancel={onCancelEdit}
        />
      </form>
    </div>
  );
};

export default AddProductForm;