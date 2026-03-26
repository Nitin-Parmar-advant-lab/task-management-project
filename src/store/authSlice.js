import { createSlice } from "@reduxjs/toolkit";
import { USER } from "../USER";
const initialAuthState = {
    isVerified: false,
    user: null,
};

const storedUserId = localStorage.getItem("currentUserId");
if (storedUserId) {
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const allUsers = [...USER, ...registeredUsers];
    
    const activeUser = allUsers.find((u) => u.id === storedUserId);
    
    if (activeUser) {
        initialAuthState.isVerified = true;
        initialAuthState.user = activeUser;
    } else {
        localStorage.removeItem("currentUserId");
    }
}


const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isVerified = true;
            state.user = action.payload;
            
            localStorage.setItem("currentUserId", action.payload.id);
            
            localStorage.removeItem("isVerified");
            localStorage.removeItem("user");
        },
        logout(state) {
            state.isVerified = false;
            state.user = null;
            
            localStorage.removeItem("currentUserId");
        },
    },
});


export const authActions = authSlice.actions;
export default authSlice.reducer;
