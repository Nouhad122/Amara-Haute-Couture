import React from 'react';
import classes from '../AddProductForm.module.css';

const MediaPreview = ({ files, previewUrls, onRemove }) => {
  if (files.length === 0) return null;

  return (
    <div className={classes['preview-container']}>
      {files.map((file, index) => (
        <div key={index} className={classes['preview-item']}>
          {file.type.startsWith('image/') ? (
            <img
              src={previewUrls[index]}
              alt={`Preview ${index + 1}`}
              className={classes['preview-image']}
            />
          ) : (
            <div className={classes['video-placeholder']}>
              <span>{file.name}</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => onRemove(index)}
            className={classes['remove-file']}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default MediaPreview;