import { createSlice } from "@reduxjs/toolkit";

export const sidebarsSlice = createSlice({
    name: 'sidebarStates',
    initialState: {
        isLeftSidebarOpen: true,//localStorage.getItem('LSidebarOpened'),
        isRightSidebarOpen: false,
    },
    reducers: {
        setLSidebarOpen(state) {
            state.isLeftSidebarOpen = !state.isLeftSidebarOpen;
            localStorage.setItem('LSidebarOpened', JSON.stringify(state.isLeftSidebarOpen));
        },
        setRSidebarOpen(state) {
            state.isRightSidebarOpen = !state.isRightSidebarOpen
        }
    }
})

export const { setLSidebarOpen, setRSidebarOpen } = sidebarsSlice.actions;
export default sidebarsSlice.reducer;