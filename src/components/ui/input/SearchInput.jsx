import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../../store/reducers/TaskGroupSlice';

import styles from './styles/SearchInput.module.css';

const SearchInput = ({ placeholder = '', ...props}) => {
    const dispatch = useDispatch();
    const isLSidebarOpened = useSelector(
        state => state.sidebarStates.isLeftSidebarOpen
    );

    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        dispatch(setFilter({filter: searchText}));
    }, [dispatch, searchText]);

    const searchStyles = !isLSidebarOpened ? {
        cursor: 'pointer'
    } : {};

  return (
      <input
            className={styles.search}
            style={searchStyles}
            type='search'
            placeholder={placeholder}
            onChange={e => setSearchText(e.target.value)}
            value={searchText}
            {...props}
        />
  )
}

export default SearchInput;
