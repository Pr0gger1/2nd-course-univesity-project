import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchFilter } from '../../../store/reducers/FilterSlice';

import styles from './styles/SearchInput.module.scss';

const SearchInput = ({ placeholder = '', ...props}) => {
    const dispatch = useDispatch();
    const isLSidebarOpened = useSelector(
        state => state.sidebarStates.isLeftSidebarOpen
    );

    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        dispatch(setSearchFilter({searchFilter: searchText}));
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
