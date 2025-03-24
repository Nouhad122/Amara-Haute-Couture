import React from 'react';
import classes from './Products.module.css';
import ProductCard from './ProductCard';
import usePagination from '../../hooks/usePagination';
import Pagination from '../SharedComps/Pagination';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../util/http';
const Products = () => {
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

  if (isLoading) {
    return (
      <div className={classes['loading-container']}>
        <p>Loading products...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={classes['error-container']}>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if(products.length === 0){
    return (
      <div className={classes['no-products']}>
        <p>No products found.</p>
      </div>
    )
  }

  // const { pageCount, handlePageClick } = usePagination({
  //   items: targetedProducts,
  //   itemsPerPage,
  //   currentPage,
  //   setCurrentPage
  // });
  
  return (
    <section className={`${classes['products-section']} grid`}>
      {
        products.map(product =>(
          <ProductCard 
            key={product._id}
            product={product}
          />
        ))
      }

      {/* <Pagination
          pageCount={pageCount}
          onPageChange={handlePageClick}
          currentPage={currentPage}
      /> */}
    </section>
  )
}

export default Products
