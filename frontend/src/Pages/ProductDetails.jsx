import React from 'react'
import SliderComp from '../Components/ProductDetails/Slider'
import Details from '../Components/ProductDetails/Details'
import classes from './ProductDetails.module.css';
import SameCategory from '../Components/ProductDetails/SameCategory';

const ProductDetails = () => {
  return (
    <>
      <section className={classes['product-details-section']}>
          <SliderComp />
          <Details />
      </section>
      <SameCategory />
    </>
  )
}

export default ProductDetails
