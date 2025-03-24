import React from 'react'
import Products from '../Products/Products';
import Title from '../SharedComps/Title';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../util/http';
const AdminProducts = () => {
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
  });
  return (
    <div>
      <Title 
        title="Admin Products" 
      />
      <Products products={products} isLoading={isLoading} isError={isError} error={error} isAdmin />
    </div>
  )
}

export default AdminProducts
