import React from 'react';
import Title from '../SharedComps/Title';
import Products from '../Products/Products';

const SameCategory = () => {
  return (
    <section>
      <Title
       title="Products From The Same Category" 
       subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      />
      <Products />
    </section>
  )
}

export default SameCategory
