import React from 'react';
import classes from './ProductCard.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../SharedComps/Button';

const ProductCard = ({ product, isAdmin, onEdit }) => {
  const navigate = useNavigate();
  
  const handleEditClick = (e) => {
    e.preventDefault();
    onEdit(product);
  };

  const salePercentage = product.oldPrice ? 
    Math.round(((product.oldPrice - product.currentPrice) / product.oldPrice) * 100) : 0;

  // Get only image media items
  const imageMedia = product.media.filter(m => m.type === 'image');
  
  // Get the first image for primary display
  const primaryMedia = imageMedia[0];
  // Get the second image for hover effect, fallback to first if not available
  const secondaryMedia = imageMedia[1] || primaryMedia;

  const renderMedia = (media) => {
    if (!media) return null;
    const url = `http://localhost:3000${media.url}`;
    return (
      <img 
        className={classes['media-item']}
        src={url}
        alt={product.name}
      />
    );
  };

  return (
    <div className={`${classes['product-card']} ${isAdmin ? classes['extra-height'] : ''}`}>
      <Link to={`/products/${product._id}/${product.name}`} className={classes['product-link']}>
        <div className={classes['product-images']}>
          {/* Primary Media */}
          <div className={classes['first-image']}>
            {renderMedia(primaryMedia)}
          </div>
          
          {/* Secondary Media (shown on hover) */}
          <div className={classes['second-image']}>
            {renderMedia(secondaryMedia)}
          </div>
          
          {/* Media Indicators */}
          {product.media.length > 2 && (
            <div className={classes['media-indicators']}>
              <span className={classes['more-media']}>
                +{product.media.length - 2} more
              </span>
            </div>
          )}

          {/* Sale Badge */}
          {product.oldPrice && (
            <span className={classes['sale']}>sale {salePercentage}%</span>
          )}
        </div>

        <div className={classes['product-text']}>
          <div className={classes['product-header']}>
            <h1 className={classes['product-name']}>{product.name}</h1>
            {product.bestSeller && (
              <span className={classes['best-seller']}>Best Seller</span>
            )}
          </div>
          <div className={classes['product-pricing']}>
            <span className={classes['product-price']}>${product.currentPrice}</span>
            {product.oldPrice && (
              <span className={`${classes['product-price']} ${classes['product-old-price']}`}>
                ${product.oldPrice}
              </span>
            )}
          </div>
          <p className={classes['product-description']}>
            {product.description}
          </p>
        </div>
      </Link>
      {
        isAdmin && (
          <div className={classes['product-btns']}>
            <Button className={classes['edit-btn']} onClick={handleEditClick}>Edit</Button>
            <Button className={classes['delete-btn']}>Delete</Button>
          </div>
        )
      }
    </div>
  );
};

export default ProductCard;
