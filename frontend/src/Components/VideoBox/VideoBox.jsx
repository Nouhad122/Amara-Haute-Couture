import React from 'react';
import classes from './VideoBox.module.css';
import videoInBox from '../../assets/video-in-box.mp4';
import Button from '../SharedComps/Button';

const VideoBox = () => {
  return (
    <div className={classes.videoContainer}>
      <video 
        className={classes.video}
        autoPlay 
        muted 
        loop
      >
        <source src={videoInBox} type="video/mp4" />
      </video>
      
      <div className={classes.contentOverlay}>
        <h2 className={classes.title}>Beyond Tradition <span className={classes.specialColor}>Uniquely AMARA</span></h2>
        <p className={classes.description}>
        Our bespoke tailoring and carefully selected fabrics ensure each piece is as unique as the woman who wears it.
        </p>
        <Button pageUrl='shop' linkButton>Explore Our Products</Button>
      </div>
    </div>
  )
}

export default VideoBox