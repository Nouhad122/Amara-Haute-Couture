import React from 'react';
import classes from './Title.module.css';

const Title = ({ title, subtitle}) => {
  return (
    <div className={classes['title-container']}>
      <h1 className={classes['title-text']}>{title}</h1>
      {subtitle && (
        <p className={classes['subtitle-text']}>{subtitle}</p>
      )}
      
    </div>
  )
}

export default Title
