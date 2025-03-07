import React from 'react';
import classes from './ProductCard.module.css';
import productImage1 from '../../assets/product-image-1.jpeg';
import productImage2 from '../../assets/product-image-2.jpeg';
import { Link } from 'react-router-dom';

const ProductCard = () => {
  return (
<>
    <Link to={'/'} className={classes['product-link']}>
    <div className={classes['product-card']}>
            <div className={classes['product-images']}>
                <img className={classes['first-image']} src={productImage1} alt=''/>
                <img className={classes['second-image']} src={productImage2} alt=''/>
                <span className={classes['sale']}>sale 10%</span>
            </div>
            <div className={classes['product-text']}>
                <div className={classes['product-header']}>
                    <h1 className={classes['product-name']}>Lorem Ipsum any thing to make it longer</h1>
                    <span className={classes['best-seller']}>Best Seller</span>
                </div>
                <div className={classes['product-pricing']}>
                    <span className={classes['product-price']}>$41</span>
                    <span className={`${classes['product-price']} ${classes['product-old-price']}`}>$46</span>
                </div>
                <p className={classes['product-description']}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book
                </p>
            </div>
        </div>
    </Link>
   

<div className={classes['product-card']}>
<div className={classes['product-images']}>
    <img className={classes['first-image']} src={productImage1} alt=''/>
    <img className={classes['second-image']} src={productImage2} alt=''/>
</div>
<div className={classes['product-text']}>
    <h1 className={classes['product-name']}>Lorem Ipsum</h1>
    <span className={classes['product-price']}>$46</span>
    <p className={classes['product-description']}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book
    </p>
</div>
</div>

<div className={classes['product-card']}>
<div className={classes['product-images']}>
    <img className={classes['first-image']} src={productImage1} alt=''/>
    <img className={classes['second-image']} src={productImage2} alt=''/>
</div>
<div className={classes['product-text']}>
    <h1 className={classes['product-name']}>Lorem Ipsum</h1>
    <span className={classes['product-price']}>$46</span>
    <p className={classes['product-description']}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book
    </p>
</div>
</div>

<div className={classes['product-card']}>
        <div className={classes['product-images']}>
            <img className={classes['first-image']} src={productImage1} alt=''/>
            <img className={classes['second-image']} src={productImage2} alt=''/>
        </div>
        <div className={classes['product-text']}>
            <h1 className={classes['product-name']}>Lorem Ipsum</h1>
            <span className={classes['product-price']}>$46</span>
            <p className={classes['product-description']}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </p>
        </div>
    </div>

<div className={classes['product-card']}>
<div className={classes['product-images']}>
    <img className={classes['first-image']} src={productImage1} alt=''/>
    <img className={classes['second-image']} src={productImage2} alt=''/>
</div>
<div className={classes['product-text']}>
    <h1 className={classes['product-name']}>Lorem Ipsum</h1>
    <span className={classes['product-price']}>$46</span>
    <p className={classes['product-description']}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book
    </p>
</div>
</div>

<div className={classes['product-card']}>
        <div className={classes['product-images']}>
            <img className={classes['first-image']} src={productImage1} alt=''/>
            <img className={classes['second-image']} src={productImage2} alt=''/>
        </div>
        <div className={classes['product-text']}>
            <h1 className={classes['product-name']}>Lorem Ipsum</h1>
            <span className={classes['product-price']}>$46</span>
            <p className={classes['product-description']}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </p>
        </div>
    </div>

<div className={classes['product-card']}>
<div className={classes['product-images']}>
    <img className={classes['first-image']} src={productImage1} alt=''/>
    <img className={classes['second-image']} src={productImage2} alt=''/>
</div>
<div className={classes['product-text']}>
    <h1 className={classes['product-name']}>Lorem Ipsum</h1>
    <span className={classes['product-price']}>$46</span>
    <p className={classes['product-description']}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book
    </p>
</div>
</div>

<div className={classes['product-card']}>
        <div className={classes['product-images']}>
            <img className={classes['first-image']} src={productImage1} alt=''/>
            <img className={classes['second-image']} src={productImage2} alt=''/>
        </div>
        <div className={classes['product-text']}>
            <h1 className={classes['product-name']}>Lorem Ipsum</h1>
            <span className={classes['product-price']}>$46</span>
            <p className={classes['product-description']}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </p>
        </div>
    </div>

<div className={classes['product-card']}>
<div className={classes['product-images']}>
    <img className={classes['first-image']} src={productImage1} alt=''/>
    <img className={classes['second-image']} src={productImage2} alt=''/>
</div>
<div className={classes['product-text']}>
    <h1 className={classes['product-name']}>Lorem Ipsum</h1>
    <span className={classes['product-price']}>$46</span>
    <p className={classes['product-description']}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book
    </p>
</div>
</div>
</>
  )
}

export default ProductCard
