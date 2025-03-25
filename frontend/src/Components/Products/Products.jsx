import React, { useState } from 'react';
import classes from './Products.module.css';
import ProductCard from './ProductCard';
import usePagination from '../../hooks/usePagination';
import Pagination from '../SharedComps/Pagination';

const Products = ({products, isLoading, isError, error, isAdmin, onEdit}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;

  const { currentItems, pageCount, handlePageClick } = usePagination({
    items: products || [],
    itemsPerPage,
    currentPage,
    setCurrentPage
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

  if(!products || products.length === 0) {
    return (
      <div className={classes['no-products']}>
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <>
      <section className={`${classes['products-section']} grid`}>
        {currentItems.map(product => (
          <ProductCard 
            key={product._id}
            product={product}
            isAdmin={isAdmin}
            onEdit={onEdit}
          />
        ))}
      </section>

      {pageCount > 1 && (
        <Pagination
          pageCount={pageCount}
          onPageChange={handlePageClick}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default Products;
