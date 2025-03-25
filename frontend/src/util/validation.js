export const validateProduct = (formData, selectedFiles, isEditing) => {
  const errors = {};
  
  // Basic field validations
  if (!formData.name.trim()) errors.name = 'Product name is required';
  if (!formData.category.trim()) errors.category = 'Category is required';
  if (!formData.description.trim()) errors.description = 'Description is required';
  
  // Price validations
  if (!formData.currentPrice) {
    errors.currentPrice = 'Current price is required';
  } else if (isNaN(formData.currentPrice) || Number(formData.currentPrice) <= 0) {
    errors.currentPrice = 'Price must be a positive number';
  }
  
  if (formData.oldPrice && (isNaN(formData.oldPrice) || Number(formData.oldPrice) < 0)) {
    errors.oldPrice = 'Old price must be a positive number or empty';
  }
  
  // Material and care instructions
  if (!formData.material.trim()) errors.material = 'Material is required';
  if (!formData.careInstructions.trim()) errors.careInstructions = 'Care instructions are required';
  
  // Files validation - only required for new products
  if (!isEditing && selectedFiles.length === 0) {
    errors.files = 'At least one image or video is required';
  }
  
  // Sizes validation
  if (formData.sizes.length === 0) {
    errors.sizes = 'At least one size must be selected';
  }
  
  return errors;
};