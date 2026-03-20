import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isVerified: JSON.parse(localStorage.getItem("isVerified")) || false,
    user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isVerified = true;
            state.user = action.payload;
            localStorage.setItem("isVerified", "true");
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout(state) {
            state.isVerified = false;
            state.user = null;
            localStorage.removeItem("isVerified");
            localStorage.removeItem("user");
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
