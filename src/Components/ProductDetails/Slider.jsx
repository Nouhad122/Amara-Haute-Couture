import React, { useState, useRef } from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight, FaPlay, FaSearchPlus, FaSearchMinus } from "react-icons/fa";
import productImage from '../../assets/product-image-1.jpeg';
import productVideo from '../../assets/trailer_G.mp4';
import classes from './Slider.module.css';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const zoomLevel = 2; // Default zoom level
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 }); // Center by default
  
  const videoRef = useRef(null);
  const imageRef = useRef(null);
  
  // Sample slide content - replace with your actual content
  const slides = [
    { 
      id: 1, 
      type: 'image',
      src: productImage,
      alt: 'Slide 1',
      thumbnail: productImage
    },
    { 
      id: 2, 
      type: 'image',
      src: productImage,
      alt: 'Slide 2',
      thumbnail: productImage
    },
    { 
      id: 3, 
      type: 'video',
      thumbnail: productImage
    },
    { 
      id: 4, 
      type: 'image',
      src: productImage,
      alt: 'Slide 4',
      thumbnail: productImage
    },
    { 
      id: 5, 
      type: 'image',
      src: productImage,
      alt: 'Slide 5',
      thumbnail: productImage
    },
    { 
      id: 6, 
      type: 'image',
      src: productImage,
      alt: 'Slide 6',
      thumbnail: productImage
    }
  ];

  // Functions to control slider
  const nextSlide = () => {
    if (isImageZoomed) {
      resetZoom();
    }
    
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    if (slides[currentSlide].type === 'video') {
      setIsVideoPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  };

  const prevSlide = () => {
    if (isImageZoomed) {
      resetZoom();
    }
    
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    if (slides[currentSlide].type === 'video') {
      setIsVideoPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  };

  const goToSlide = (index) => {
    if (currentSlide === index) return;
    
    if (isImageZoomed) {
      resetZoom();
    }
    
    if (slides[currentSlide].type === 'video') {
      setIsVideoPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
    
    setCurrentSlide(index);
  };

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = true; // Ensure video stays muted
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Image zoom functions
  const toggleZoom = () => {
    setIsImageZoomed(prev => !prev);
    if (!isImageZoomed) {
      // When zooming in, start with center position
      setZoomPosition({ x: 50, y: 50 });
    }
  };

  const resetZoom = () => {
    setIsImageZoomed(false);
  };

  const handleMouseMove = (e) => {
    if (!isImageZoomed || !imageRef.current) return;
    
    // Calculate cursor position as percentage of image dimensions
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Update zoom position based on cursor
    setZoomPosition({ x, y });
  };

  return (
    <div className={classes.sliderContainer}>
      <div className={classes.sliderWrapper}>
        {/* Main slider */}
        <div className={classes.sliderContent}>
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`${classes.slide} ${index === currentSlide ? classes.activeSlide : ''}`}
            >
              {slide.type === 'image' ? (
                <div 
                  className={`${classes.imageContainer} ${isImageZoomed ? classes.zoomed : ''}`}
                  onClick={toggleZoom}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={resetZoom}
                >
                  <img 
                    ref={index === currentSlide ? imageRef : null}
                    src={slide.src} 
                    alt={slide.alt} 
                    className={classes.slideImage}
                    style={
                      isImageZoomed ? {
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        transform: `scale(${zoomLevel})`,
                        cursor: 'zoom-out'
                      } : {
                        cursor: 'zoom-in'
                      }
                    }
                  />
                  <div className={classes.zoomIndicator}>
                    {isImageZoomed ? <FaSearchMinus /> : <FaSearchPlus />}
                  </div>
                </div>
              ) : (
                <div className={classes.videoContainer}>
                  <video 
                    ref={videoRef}
                    className={classes.videoElement} 
                    controls={isVideoPlaying}
                    muted
                    autoPlay={false}
                    loop={false}
                    poster={slide.thumbnail}
                    playsInline
                    onEnded={handleVideoEnded}
                  >
                    <source src={productVideo} type="video/mp4" />
                  </video>
                  {!isVideoPlaying && (
                    <button 
                      className={classes.playButton}
                      onClick={handlePlayVideo}
                      aria-label="Play video"
                    >
                      <FaPlay className={classes.playIcon} />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Navigation arrows */}
        <button 
          className={`${classes.navButton} ${classes.prevButton}`}
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <FaChevronCircleLeft size={24} />
        </button>
        
        <button 
          className={`${classes.navButton} ${classes.nextButton}`}
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <FaChevronCircleRight size={24} />
        </button>
      </div>
      
      {/* Thumbnail navigation dots */}
      <div className={classes.thumbnailContainer}>
        <div className={classes.thumbnailWrapper}>
          {slides.map((slide, index) => (
            <button
              key={`thumb-${slide.id}`}
              onClick={() => goToSlide(index)}
              className={`${classes.thumbnail} ${index === currentSlide ? classes.activeThumbnail : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <img 
                src={slide.thumbnail} 
                alt={`Thumbnail ${index + 1}`}
                className={classes.thumbnailImage}
              />
              {slide.type === 'video' && (
                <div className={classes.videoOverlay}>
                  <svg className={classes.smallPlayIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 8.96533C9.5 8.48805 9.5 8.24941 9.59974 8.11618C9.68666 8.00007 9.81971 7.92744 9.96438 7.9171C10.1304 7.90525 10.3311 8.03429 10.7326 8.29235L15.4532 11.3271C15.8016 11.551 15.9758 11.663 16.0359 11.8054C16.0885 11.9298 16.0885 12.0702 16.0359 12.1946C15.9758 12.337 15.8016 12.449 15.4532 12.6729L10.7326 15.7076C10.3311 15.9657 10.1304 16.0948 9.96438 16.0829C9.81971 16.0726 9.68666 15.9999 9.59974 15.8838C9.5 15.7506 9.5 15.512 9.5 15.0347V8.96533Z" fill="white"/>
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;