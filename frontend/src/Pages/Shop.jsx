import React from 'react'
import Products from '../Components/Products/Products'
import Title from '../Components/SharedComps/Title'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../util/http'

const Shop = () => {
  const { 
    data: products, 
    isLoading, 
    isError,
    error 
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 60 // 1 hour
  });


  return (
    <>
      <Title title="Our Products" subtitle="Discover the art of our designs"/>
      <Products 
       products={products} 
       isLoading={isLoading} 
       isError={isError} 
       error={error} />
      </>
    
  )
}

export default Shop
