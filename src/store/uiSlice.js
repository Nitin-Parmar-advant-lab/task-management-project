import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDarkMode: JSON.parse(localStorage.getItem("isDarkMode")) || false,
    view: localStorage.getItem("view") || "kanban",
    isSidebarOpen: false,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleDarkMode(state) {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem("isDarkMode", JSON.stringify(state.isDarkMode));
        },
        setDarkMode(state, action) {
            state.isDarkMode = action.payload;
            localStorage.setItem("isDarkMode", JSON.stringify(state.isDarkMode));
        },
        setView(state, action) {
            state.view = action.payload;
            localStorage.setItem("view", action.payload);
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
