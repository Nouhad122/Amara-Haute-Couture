import React from 'react';
import classes from './Loader.module.css';

const Loader = ({ text = 'Loading...' }) => {
  return (
    <div className={classes.container}>
      <div className={classes.loader}>
        <div className={classes.circle}></div>
        <div className={classes.circle}></div>
        <div className={classes.circle}></div>
      </div>
      <p className={classes.text}>{text}</p>
    </div>
  );
};

export default Loader; 