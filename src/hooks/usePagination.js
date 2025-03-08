import { useMemo, useEffect } from 'react';

const usePagination = ({ items, itemsPerPage, currentPage, setCurrentPage }) => {
  const offset = currentPage * itemsPerPage;
  useEffect(() =>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },[currentPage]);

  const currentItems = useMemo(() => 
    items?.slice(offset, offset + itemsPerPage) || [], 
    [items, offset, itemsPerPage]
  );

  const pageCount = useMemo(() => 
    Math.ceil(items?.length / itemsPerPage), 
    [items, itemsPerPage]
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return {
    currentItems,
    pageCount,
    handlePageClick
  };
};

export default usePagination;
