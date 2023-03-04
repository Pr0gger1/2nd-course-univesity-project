import React from 'react';
import styles from './styles/SearchInput.module.css';
import {useSelector} from "react-redux";

const SearchInput = ({ placeholder = '', ...props}) => {
    const isLSidebarOpened = useSelector(
        state => state.sidebarStates.isLeftSidebarOpen
    );

    const searchStyles = !isLSidebarOpened ? {
        cursor: 'pointer'
    } : {};

  return (
      <input
            className={styles.search}
            style={searchStyles}
            type='search'
            placeholder={placeholder}
            {...props}
        />
  )
}

export default SearchInput;
