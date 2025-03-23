import React from 'react';
import classes from './Details.module.css';

const Details = () => {
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className={classes['details-container']}>
      <h1 className={classes.title}>Elegant Evening Gown</h1>
      
      <div className={classes.price}>
        <span className={classes['price-amount']}>$599.99</span>
        <span className={classes['price-shipping']}>Free Shipping</span>
      </div>

      <div className={classes.description}>
        <h2>Product Description</h2>
        <p>
          This stunning evening gown features delicate hand-embroidered details and 
          premium silk fabric. Perfect for special occasions, the dress showcases 
          elegant draping and a flattering silhouette that complements any figure. 
          The intricate beadwork catches the light beautifully, making you shine 
          at any formal event.
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
