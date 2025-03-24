import React from 'react';
import classes from './Details.module.css';

const Details = ({product}) => {
  const sizes = product.availableSizes;

  return (
    <div className={classes['details-container']}>
      <h1 className={classes.title}>{product.name}</h1>
      
      <div className={classes.price}>
        <span className={classes['price-amount']}>${product.currentPrice}</span>
        <span className={classes['price-shipping']}>Shipping Included</span>
      </div>

      <div className={classes.description}>
        <h2>About this {product.category}</h2>
        <p>
          {product.description}
        </p>
      </div>

      <div className={classes.sizes}>
        <h2>Available Sizes</h2>
        <div className={classes['size-options']}>
          {sizes.map((size) => (
            <button key={size} className={classes['size-btn']}>
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className={classes.additional}>
        <div className={classes['info-item']}>
          <h3>Material</h3>
          <p>100% Premium Silk</p>
        </div>
        <div className={classes['info-item']}>
          <h3>Care Instructions</h3>
          <p>Dry Clean Only</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
