import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDarkMode: false,
    isSidebarOpen: false,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleDarkMode(state) {
            state.isDarkMode = !state.isDarkMode;
        },
        setDarkMode(state, action) {
            state.isDarkMode = action.payload;
        },
        toggleSidebar(state) {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        closeSidebar(state) {
            state.isSidebarOpen = false;
        },
    },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
