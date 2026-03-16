import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        items: [],
    },
    reducers: {
        addTask(state, action) {
            state.items.push(action.payload);
        },
    },
});

export const tasksAction = taskSlice.actions;

export default taskSlice.reducer;
