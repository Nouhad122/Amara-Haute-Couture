import React from 'react';
import Title from '../SharedComps/Title';
import Products from '../Products/Products';
import classes from './SameCategory.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../util/http';
import Loader from '../SharedComps/Loader';

const SameCategory = ({ category, productId }) => {
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  if (isLoading) {
    return <Loader text="Loading similar products..." />;
  }

  if (isError) {
    return (
      <div className="error-container">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  // Filter products by category and exclude current product
  const sameProducts = products?.filter(
    product => product.category === category && product._id !== productId
  );

  if (!sameProducts || sameProducts.length === 0) {
    return null; // Don't show section if no similar products
  }

  return (
    <section className={classes.sameCategorySection}>
      <Title
       title="You May Also Like" 
       subtitle="Explore more products in this category"
      />
      <Products 
        products={sameProducts} 
        isLoading={false} 
        isError={false} 
      />
    </section>
  )
}

export default SameCategory
