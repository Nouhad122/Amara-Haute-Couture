import React from 'react'
import Slider from '../Components/ProductDetails/Slider'
import Details from '../Components/ProductDetails/Details'
import classes from './ProductDetails.module.css';
import SameCategory from '../Components/ProductDetails/SameCategory';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '../util/http';
import Loader from '../Components/SharedComps/Loader';
import NotFound from './NotFound';

const ProductDetails = () => {
  const { id } = useParams();

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id)
  });

  if(isLoading){
    return <Loader text="Loading product details..." />;
  }

  if(isError){
    return (
      <div className={classes['error-container']}>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if(!product){
    return <NotFound />;
  }

  return (
    <>
      <section className={classes['product-details-section']}>
        <Slider product={product} />
        <Details product={product} />
      </section>
      <SameCategory category={product.category} productId={product._id}/>
    </>
  )
}

export default ProductDetails
