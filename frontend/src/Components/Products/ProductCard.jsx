import React from 'react';
import classes from './ProductCard.module.css';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const salePercentage = Math.round(((product.oldPrice - product.currentPrice) / product.oldPrice) * 100);

  return (
    <>
     <Link to={`/products/${product._id}/${product.name}`} className={classes['product-link']}>
        <div className={classes['product-card']}>
            <div className={classes['product-images']}>
                <img className={classes['first-image']} src={product.imageUrl} alt={product.name}/>
                <img className={classes['second-image']} src={product.imageUrl} alt={product.name}/>
                {product.oldPrice && <span className={classes['sale']}>sale {salePercentage}%</span>}
            </div>
            <div className={classes['product-text']}>
                <div className={classes['product-header']}>
                    <h1 className={classes['product-name']}>{product.name}</h1>
                    {product.isBestSeller && <span className={classes['best-seller']}>Best Seller</span>}
                </div>
                <div className={classes['product-pricing']}>
                    <span className={classes['product-price']}>${product.currentPrice}</span>
                    {product.oldPrice &&
                     <span className={`${classes['product-price']} ${classes['product-old-price']}`}>
                        ${product.oldPrice}
                     </span>}
                </div>
                <p className={classes['product-description']}>
                    {product.description}
                </p>
            </div>
        </div>
     </Link>
    </>
  )
}

export default ProductCard
