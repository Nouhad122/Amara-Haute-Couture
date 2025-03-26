import React from 'react';
import classes from './OurDesigner.module.css';
import Title from '../SharedComps/Title';
import designerImage from '../../assets/designer-image.jpeg';

const OurDesigner = () => {
  return (
    <section className={classes.ourDesigner}>
      <Title 
        title="Meet Our Designer" 
        subtitle="The creative mind behind Amara Haute Couture"
      />
      
      <div className={classes.content}>
        <div className={classes.imageContainer}>
          <img 
            src={designerImage} 
            alt="Maryam El Hallab - Fashion Designer" 
            className={classes.designerImage}
            loading="lazy"
          />
        </div>
        
        <div className={classes.textContent}>
          <h3 className={classes.name}>Maryam El Hallab</h3>
          <p className={classes.description}>
            As the founder and creative director of Amara Haute Couture, Maryam El Hallab has established a luxury brand recognized for exclusivity and exceptional craftsmanship in bespoke dresses and abayas. Her business acumen combined with artistic vision has positioned Amara as a leading name in high-end evening wear and bridal collections.
          </p>
          <p className={classes.description}>
            With formal training from prestigious fashion institutes and experience collaborating with renowned ateliers, Maryam brings both technical expertise and market insight to each design. Her strategic approach to sustainable luxury has attracted a distinguished clientele seeking investment-quality dresses and abayas that harmoniously blend traditional elegance with contemporary sophistication.
          </p>
          <p className={classes.quote}>
            "At Amara Haute Couture, we don't just create dresses and abayas; we craft wearable art that delivers exceptional value through superior materials, exclusive design, and the promise of timeless elegance that becomes part of a woman's most treasured moments."
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurDesigner; 