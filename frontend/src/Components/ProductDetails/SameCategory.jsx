import React from 'react';
import Title from '../SharedComps/Title';
import Products from '../Products/Products';
import classes from './SameCategory.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../util/http';
const SameCategory = ({category}) => {

  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['product'],
    queryFn: () => fetchProducts(),
    select: (data) => {
      return data.filter(product => product.category.toLowerCase() === category.toLowerCase());
    } 
  });
  return (
    <section className={classes.sameCategorySection}>
      <Title
       title="Products From The Same Category" 
       subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      />
      <Products products={products} isLoading={isLoading} isError={isError} error={error} />
    </section>
  )
}

export default SameCategory
