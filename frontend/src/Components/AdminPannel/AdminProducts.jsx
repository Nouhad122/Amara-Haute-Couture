import React, { useState } from 'react'
import Products from '../Products/Products';
import Title from '../SharedComps/Title';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchProducts, deleteProduct, queryClient } from '../../util/http';
import Modal from '../SharedComps/Modal';

const AdminProducts = ({ onEdit }) => {
  const [errorModal, setErrorModal] = useState({ show: false, message: '' });

  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error('Delete product error:', error);
      setErrorModal({
        show: true,
        message: error.message || 'Failed to delete product. Please try again.'
      });
    }
  });

  const handleDelete = async (productId) => {
    try {
      await deleteMutation.mutateAsync(productId);
    } catch (error) {
      // Error is handled in the mutation's onError
    }
  };

  return (
    <div>
      <Title 
        title="Admin Products" 
      />
      <Products 
        products={products} 
        isLoading={isLoading} 
        isError={isError} 
        error={error} 
        isAdmin 
        onEdit={onEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={errorModal.show}
        onClose={() => setErrorModal({ show: false, message: '' })}
        title="Error"
        message={errorModal.message}
        cancelText="Close"
      />
    </div>
  )
}

export default AdminProducts
