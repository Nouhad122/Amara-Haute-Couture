import React from 'react';
import classes from './Details.module.css';

const Details = () => {
  return (
    <div className={classes['details-container']}>
      <h1>Lorem Ipsum Lorem Ipsum</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
           It has survived not only five centuries, but also the leap into electronic
      </p>
      <ul>
        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
      </ul>
    </div>
  )
}

export default Details
