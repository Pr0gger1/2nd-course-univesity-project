import React from 'react';
import styles from './styles/ImgButton.module.scss';

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