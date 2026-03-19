import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./taskSlice";
import authSlice from "./authSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
    reducer: {
        tasks: taskSlice,
        auth: authSlice,
        ui: uiSlice,
    },
});


export default store;
