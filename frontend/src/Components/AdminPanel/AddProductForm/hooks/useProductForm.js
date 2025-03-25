import { useState, useEffect } from 'react';
import { validateProduct } from '../utils/validation';

const initialFormState = {
  name: '',
  category: '',
  description: '',
  currentPrice: '',
  oldPrice: '',
  sizes: [],
  bestSeller: false,
  material: '',
  careInstructions: ''
};

export const useProductForm = (editingProduct) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        category: editingProduct.category || '',
        description: editingProduct.description || '',
        currentPrice: editingProduct.currentPrice || '',
        oldPrice: editingProduct.oldPrice || '',
        sizes: editingProduct.availableSizes || [],
        bestSeller: editingProduct.bestSeller || false,
        material: editingProduct.material || '',
        careInstructions: editingProduct.careInstructions || ''
      });

      // Handle existing media files
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
      resetForm();
    }
  }, [editingProduct]);

  const resetForm = () => {
    setFormData(initialFormState);
    setSelectedFiles([]);
    setPreviewUrls([]);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = validateProduct(formData, selectedFiles, !!editingProduct);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
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
  };
};