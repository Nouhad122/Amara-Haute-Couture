import React from 'react'
import Products from '../Products/Products';
import Title from '../SharedComps/Title';

const AdminProducts = () => {
  return (
    <div>
      <Title 
        title="Admin Products" 
      />
      <Products />
    </div>
  )
}

export default AdminProducts
