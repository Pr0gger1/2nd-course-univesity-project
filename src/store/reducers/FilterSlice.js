import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filterStates',
    initialState: {
        searchFilter: ''
    },
    reducers: {
        setSearchFilter(state, action) {
            state.searchFilter = action.payload.searchFilter;
        }
    }
});

export const { setSearchFilter } = filterSlice.actions;
export default filterSlice.reducer;