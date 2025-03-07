import React from 'react';
import { NavLink } from 'react-router-dom';
import amaraLogo from '../../assets/Amara-logo.svg';
import classes from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={classes['navbar']}>
      <NavLink to={`/`}>
      <img 
        className={classes['amara-logo']} 
        src={amaraLogo} 
        alt='Amara haute couture logo'
      />
      </NavLink>
    </nav>
  )
}

export default Navbar
