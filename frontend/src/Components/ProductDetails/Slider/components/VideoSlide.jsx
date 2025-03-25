import React from 'react';
import * as FaIcons from "react-icons/fa";
import classes from '../Slider.module.css';

const VideoSlide = ({ 
  slide, 
  videoRef, 
  isPlaying, 
  onPlay, 
  onVideoEnded 
}) => {
  return (
    <div className={classes.videoContainer}>
      <video 
        ref={videoRef}
        className={classes.videoElement} 
        src={slide.src}
        controls={isPlaying}
        muted
        playsInline
        onEnded={onVideoEnded}
      >
        Your browser does not support the video tag.
      </video>
      {!isPlaying && (
        <button 
          className={classes.playButton}
          onClick={onPlay}
          aria-label="Play video"
        >
          <FaIcons.FaPlay className={classes.playIcon} />
        </button>
      )}
    </div>
  );
};

export default VideoSlide;