import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, message, onConfirm, confirmText, cancelText }) => {
  const [modalRoot, setModalRoot] = useState(null);

  useEffect(() => {
    // Try to find existing modal root
    let element = document.getElementById('modal-root');
    
    // If it doesn't exist, create it
    if (!element) {
      element = document.createElement('div');
      element.id = 'modal-root';
      document.body.appendChild(element);
    }
    
    setModalRoot(element);

    // Cleanup on unmount
    return () => {
      if (element.parentElement && !element.childNodes.length) {
        element.parentElement.removeChild(element);
      }
    };
  }, []);

  if (!isOpen || !modalRoot) return null;

  return ReactDOM.createPortal(
    <>
      <div className={classes.overlay} onClick={onClose} />
      <div className={classes.modal}>
        <div className={classes.header}>
          <h2 className={classes.title}>{title}</h2>
          <button className={classes.closeBtn} onClick={onClose}>&times;</button>
        </div>
        <div className={classes.content}>
          <p className={classes.message}>{message}</p>
        </div>
        <div className={classes.actions}>
          {onConfirm && (
            <Button 
              onClick={onConfirm}
              className={classes['confirm-btn']}
            >
              {confirmText || 'Confirm'}
            </Button>
          )}
          <Button 
            onClick={onClose}
            className={classes['cancel-btn']}
          >
            {cancelText || 'Cancel'}
          </Button>
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default Modal; 