import React, { useState } from 'react';
import classes from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import Button from '../SharedComps/Button';
import Modal from '../SharedComps/Modal';

const ProductCard = ({ product, isAdmin, onEdit, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const handleEditClick = (e) => {
    e.preventDefault();
    onEdit(product);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(product._id);
    setShowDeleteModal(false);
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
    
    // Check if the URL is already an absolute URL (starts with http:// or https://)
    const isAbsoluteUrl = media.url.startsWith('http://') || media.url.startsWith('https://');
    
    // If it's an absolute URL (like Cloudinary), use it directly
    // Otherwise, prefix with backend URL for relative paths
    const url = isAbsoluteUrl 
      ? media.url 
      : `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}${media.url}`;
    
    return (
      <img 
        className={classes['media-item']}
        src={url}
        alt={product.name}
        loading="lazy"
        onError={(e) => {
          console.error('Image failed to load:', url);
          e.target.onerror = null; 
          e.target.src = 'https://via.placeholder.com/300x400?text=Image+Not+Found';
        }}
      />
    );
  };

  return (
    <>
      <div className={`${classes['product-card']} ${isAdmin ? classes['extra-height'] : ''}`}>
        <Link to={`/shop/${product._id}/${product.name}`} className={classes['product-link']}>
          <div className={classes['product-images']}>
            {/* Primary Media */}
            <div className={classes['first-image']}>
              {renderMedia(primaryMedia)}
            </div>
            
            {/* Secondary Media (shown on hover) */}
            <div className={classes['second-image']}>
              {renderMedia(secondaryMedia)}
            </div>

            {/* Sale Badge */}
            {product.oldPrice > 0 && (
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
              {product.oldPrice > 0 && (
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
              <Button className={classes['delete-btn']} onClick={handleDeleteClick}>Delete</Button>
            </div>
          )
        }
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Product"
        message={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default ProductCard;
