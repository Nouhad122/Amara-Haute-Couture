import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, message, onConfirm, confirmText, cancelText }) => {
  const [modalRoot, setModalRoot] = useState(null);

  // Effect to create or find modal root when modal is open
  useEffect(() => {
    if (!isOpen) {
      // Don't create DOM elements if modal isn't visible
      setModalRoot(null);
      return;
    }

    // Find or create modal root
    let element = document.getElementById('modal-root');
    
    if (!element) {
      element = document.createElement('div');
      element.id = 'modal-root';
      document.body.appendChild(element);
    }
    
    setModalRoot(element);
  }, [isOpen]);

  // If modal is closed or root element isn't available, don't render
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