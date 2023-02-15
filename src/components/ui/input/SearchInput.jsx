import React from 'react';
import styles from './styles/SearchInput.module.css' 

const SearchInput = ({ placeholder = '', ...props}) => {
  return (
        <input
            className={styles.search}
            type='search'
            placeholder={placeholder}
            {...props}
        />
  )
}

export default SearchInput;
