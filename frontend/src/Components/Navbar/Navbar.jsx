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

      {/* <div className={classes['navbar-links']}> 
        <NavLink to={`/admin`}>
          <button className={classes['link-btn']}>Admin Pannel</button>
        </NavLink>
      </div> */}
    </nav>
  )
}

export default Navbar
