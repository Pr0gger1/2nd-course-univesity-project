import { createSlice } from "@reduxjs/toolkit";

export const UISlice = createSlice({
    name: 'uiStates',
    initialState: {
        isLeftSidebarOpen: true,
        isRightSidebarOpen: false,
        isMobile: /Mobi/i.test(navigator.userAgent)
    },
    reducers: {
        setLBarOpen: (state) => state.isLeftSidebarOpen = !state.isLeftSidebarOpen,
        setRBarOpen: (state) => state.isRightSidebarOpen = !state.isRightSidebarOpen
    }
})
export const { setLBarOpen, setRBarOpen } = UISlice.actions;
export default UISlice.reducer;