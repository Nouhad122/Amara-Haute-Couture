import React from 'react';
import classes from './Footer.module.css';
import logoImage from '../../assets/Amara-logo.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={classes.footer}>
      <div className={classes.content}>
        <div className={classes.logoContainer}>
          <img src={logoImage} alt="Amara Logo" className={classes.logo} />
        </div>
        <div className={classes.text}>
          <p className={classes.brand}>@Amara Haute Couture</p>
          <p className={classes.description}>
            Crafted with passion by Maryam El Hallab, bringing elegant and timeless designs to life.
          </p>
          <p className={classes.copyright}>
            &copy; {currentYear} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 