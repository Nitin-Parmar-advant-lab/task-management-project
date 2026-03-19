import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload;
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout(state) {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("user");
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
