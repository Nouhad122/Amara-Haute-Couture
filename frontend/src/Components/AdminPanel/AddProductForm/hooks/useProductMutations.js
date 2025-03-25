import { useMutation } from '@tanstack/react-query';
import { addProduct, updateProduct, queryClient } from '../../../../util/http';

export const useProductMutations = ({ onSuccess, onError, selectedFiles }) => {
  const createFormData = (data) => {
    const formDataToSend = new FormData();
    
    // Add form fields
    formDataToSend.append('name', data.name);
    formDataToSend.append('category', data.category);
    formDataToSend.append('description', data.description);
    formDataToSend.append('currentPrice', Number(data.currentPrice).toString());
    formDataToSend.append('oldPrice', data.oldPrice ? Number(data.oldPrice).toString() : '0');
    formDataToSend.append('availableSizes', JSON.stringify(data.sizes || []));
    formDataToSend.append('bestSeller', data.bestSeller.toString());
    formDataToSend.append('material', data.material);
    formDataToSend.append('careInstructions', data.careInstructions);
    
    // Add files
    if (selectedFiles && selectedFiles.length > 0) {
      selectedFiles.forEach(file => {
        formDataToSend.append('files', file);
      });
    }
    
    return formDataToSend;
  };

  const addMutation = useMutation({
    mutationFn: async (data) => {
      const formData = createFormData(data);
      return addProduct(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      if (onSuccess) onSuccess();
    },
    onError
  });

  const updateMutation = useMutation({
    mutationFn: async ({ productId, data }) => {
      const formData = createFormData(data);
      return updateProduct(productId, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      if (onSuccess) onSuccess();
    },
    onError
  });

  return { addMutation, updateMutation };
};