import React from 'react';
import classes from './Products.module.css';
import ProductCard from './ProductCard';

const Products = () => {
  return (
    <section className={`${classes['products-section']} grid`}>
      <ProductCard />
    </section>
  )
}

export default Products
