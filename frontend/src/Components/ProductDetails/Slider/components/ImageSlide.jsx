import React from 'react';
import * as FaIcons from "react-icons/fa";
import classes from '../Slider.module.css';

const ImageSlide = ({ 
  slide, 
  index, 
  currentSlide,
  imageRef, 
  isZoomed, 
  zoomPosition, 
  zoomLevel, 
  onToggleZoom, 
  onMouseMove, 
  onMouseLeave 
}) => {
  return (
    <div 
      className={`${classes.imageContainer} ${isZoomed ? classes.zoomed : ''}`}
      onClick={onToggleZoom}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <img 
        ref={index === currentSlide ? imageRef : null}
        src={slide.src} 
        alt={slide.alt} 
        className={classes.slideImage}
        style={
          isZoomed ? {
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            transform: `scale(${zoomLevel})`,
            cursor: 'zoom-out'
          } : {
            cursor: 'zoom-in'
          }
        }
      />
      <div className={classes.zoomIndicator}>
        {isZoomed ? <FaIcons.FaSearchMinus /> : <FaIcons.FaSearchPlus />}
      </div>
    </div>
  );
};

export default ImageSlide;