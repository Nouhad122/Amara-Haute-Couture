import React from 'react'
import { Link } from 'react-router-dom';
import classes from './Button.module.css';

const Button = ({ className, linkButton, pageUrl, onClick, children, ...props }) => {
    const ButtonClasses = `${classes.exploreButton} ${className ? className : undefined}` ;
  return (
    <>
    {linkButton && <Link to={pageUrl} className={ButtonClasses}>{children}</Link>}
    {!linkButton &&
     <button className={ButtonClasses} onClick={onClick} {...props} >
        {children}
    </button>
    }
    
    </>
    
  )
}

export default Button
