import { useState, useRef } from 'react';

export const useSlider = (product) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const zoomLevel = 2;
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  
  const videoRef = useRef(null);
  const imageRef = useRef(null);
  const thumbnailVideoRefs = useRef([]);

  // Function to format the URL correctly
  const formatUrl = (url) => {
    // Check if the URL is already an absolute URL (starts with http:// or https://)
    const isAbsoluteUrl = url.startsWith('http://') || url.startsWith('https://');
    
    // If it's an absolute URL (like Cloudinary), use it directly
    // Otherwise, prefix with backend URL for relative paths
    return isAbsoluteUrl 
      ? url 
      : `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}${url}`;
  };

  // Map product media to slides format
  const slides = product.media.map((media, index) => ({
    id: index + 1,
    type: media.type,
    src: formatUrl(media.url),
    alt: `${product.name} - View ${index + 1}`,
    thumbnail: formatUrl(media.url)
  }));

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
      videoRef.current.muted = true; 
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

  const toggleZoom = () => {
    setIsImageZoomed(prev => !prev);
    if (!isImageZoomed) {
      setZoomPosition({ x: 50, y: 50 });
    }
  };

  const resetZoom = () => {
    setIsImageZoomed(false);
  };

  const handleMouseMove = (e) => {
    if (!isImageZoomed || !imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  };

  return {
    currentSlide,
    isVideoPlaying,
    isImageZoomed,
    zoomLevel,
    zoomPosition,
    videoRef,
    imageRef,
    thumbnailVideoRefs,
    slides,
    nextSlide,
    prevSlide,
    goToSlide,
    handlePlayVideo,
    handleVideoEnded,
    toggleZoom,
    resetZoom,
    handleMouseMove
  };
};