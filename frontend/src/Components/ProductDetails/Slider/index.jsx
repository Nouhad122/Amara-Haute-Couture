import React from 'react';
import * as FaIcons from "react-icons/fa";
import classes from './Slider.module.css';
import { useSlider } from '../../../hooks/useSlider';
import ImageSlide from './components/ImageSlide';
import VideoSlide from './components/VideoSlide';
import ThumbnailItem from './components/ThumbnailItem';

const Slider = ({ product }) => {
  const sliderProps = useSlider(product);

  // Don't render if no media
  if (!product.media || product.media.length === 0) {
    return null;
  }

  return (
    <div className={classes.sliderContainer}>
      <div className={classes.sliderWrapper}>
        {/* Main slider */}
        <div className={classes.sliderContent}>
          {sliderProps.slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`${classes.slide} ${index === sliderProps.currentSlide ? classes.activeSlide : ''}`}
            >
              {slide.type === 'image' ? (
                <ImageSlide 
                  slide={slide}
                  index={index}
                  currentSlide={sliderProps.currentSlide}
                  imageRef={sliderProps.imageRef}
                  isZoomed={sliderProps.isImageZoomed}
                  zoomPosition={sliderProps.zoomPosition}
                  zoomLevel={sliderProps.zoomLevel}
                  onToggleZoom={sliderProps.toggleZoom}
                  onMouseMove={sliderProps.handleMouseMove}
                  onMouseLeave={sliderProps.resetZoom}
                />
              ) : (
                <VideoSlide 
                  slide={slide}
                  videoRef={sliderProps.videoRef}
                  isPlaying={sliderProps.isVideoPlaying}
                  onPlay={sliderProps.handlePlayVideo}
                  onVideoEnded={sliderProps.handleVideoEnded}
                />
              )}
            </div>
          ))}
        </div>
        
        {/* Navigation arrows */}
        {sliderProps.slides.length > 1 && (
          <>
            <button 
              className={`${classes.navButton} ${classes.prevButton}`}
              onClick={sliderProps.prevSlide}
              aria-label="Previous slide"
            >
              <FaIcons.FaChevronCircleLeft size={24} />
            </button>
            
            <button 
              className={`${classes.navButton} ${classes.nextButton}`}
              onClick={sliderProps.nextSlide}
              aria-label="Next slide"
            >
              <FaIcons.FaChevronCircleRight size={24} />
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnail navigation */}
      {sliderProps.slides.length > 1 && (
        <div className={classes.thumbnailContainer}>
          <div className={classes.thumbnailWrapper}>
            {sliderProps.slides.map((slide, index) => (
              <ThumbnailItem
                key={`thumb-${slide.id}`}
                slide={slide}
                index={index}
                isActive={index === sliderProps.currentSlide}
                thumbnailVideoRef={(el) => sliderProps.thumbnailVideoRefs.current[index] = el}
                onSelect={sliderProps.goToSlide}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;