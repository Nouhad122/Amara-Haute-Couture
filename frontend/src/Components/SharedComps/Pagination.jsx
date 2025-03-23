import React from 'react';
import ReactPaginate from 'react-paginate';
import classes from './Pagination.module.css';

const Pagination = ({ pageCount, onPageChange, currentPage}) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next >"
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      previousLabel="< Previous"
      containerClassName={classes.pagination}
      pageClassName={classes['page-item']}
      pageLinkClassName={classes['page-link']}
      previousClassName={`${classes['page-item']} ${classes['prev-item']}`}
      nextClassName={`${classes['page-item']} ${classes['next-item']}`}
      previousLinkClassName={classes['page-link']}
      nextLinkClassName={classes['page-link']}
      activeClassName={classes.active}
      disabledClassName={classes.disabled}
      forcePage={currentPage}
    />
  )
}

export default Pagination
