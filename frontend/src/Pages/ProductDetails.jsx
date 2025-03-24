import React from 'react'
import Slider from '../Components/ProductDetails/Slider'
import Details from '../Components/ProductDetails/Details'
import classes from './ProductDetails.module.css';
import SameCategory from '../Components/ProductDetails/SameCategory';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '../util/http';
const ProductDetails = () => {
  const { id } = useParams();

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id)
  });

  if(isLoading){
    return <div>Loading...</div>;
  }

  if(isError){
    return <div>Error: {error.message}</div>;
  }

  if(!product){
    return <div>Product not found</div>;
  }

  return (
    
    <>
      <section className={classes['product-details-section']}>
          <Slider product={product} />
          <Details product={product} />
      </section>
      <SameCategory category={product.category}/>
    </>
  )
}

export default ProductDetails
