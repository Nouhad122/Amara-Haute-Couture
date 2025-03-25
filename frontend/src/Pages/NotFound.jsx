import React from 'react';
import { Link } from 'react-router-dom';
import classes from './NotFound.module.css';
import Button from '../Components/SharedComps/Button';

const NotFound = () => {
  return (
    <div className={classes.container}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <div className={classes.actions}>
        <Button 
          linkButton 
          pageUrl="/"
          className={classes['home-btn']}
        >
          Back to Home
        </Button>
        <Button 
          linkButton 
          pageUrl="/shop"
          className={classes['shop-btn']}
        >
          Browse Products
        </Button>
      </div>
    </div>
  );
};

export default NotFound; 