import React from 'react';
import styles from './styles/img_button.module.css';

const ImgButton = ({ src, alt, ...props }) => {
    return (
        <button 
            className={styles.img__btn}
            {...props}
            >
            <img alt={alt} src={src}/>
        </button>
    );
};

export default ImgButton;