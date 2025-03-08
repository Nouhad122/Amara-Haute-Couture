import React from 'react';
import classes from './Products.module.css';
import ProductCard from './ProductCard';
import usePagination from '../../hooks/usePagination';
import Pagination from '../SharedComps/Pagination';

const Products = () => {
  // const itemsPerPage = 4;
  // const [currentPage, setCurrentPage] = useState(0);

  // const { pageCount, handlePageClick } = usePagination({
  //   items: targetedProducts,
  //   itemsPerPage,
  //   currentPage,
  //   setCurrentPage
  // });
  return (
    <section className={`${classes['products-section']} grid`}>
      <ProductCard />
      {/* <Pagination
          pageCount={pageCount}
          onPageChange={handlePageClick}
          currentPage={currentPage}
      /> */}
    </section>
  )
}

export default Products
