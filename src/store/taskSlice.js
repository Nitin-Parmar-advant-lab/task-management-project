import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        projects: JSON.parse(localStorage.getItem("projects")) || [
            { id: "p1", title: "Web D", tasks: [] },
            { id: "p2", title: "Learning", tasks: [] },
        ],
        selectedProjectId: "p1",
    },
    reducers: {
        addProject(state, action) {
            state.projects.push({ ...action.payload, tasks: [] });
            localStorage.setItem("projects", JSON.stringify(state.projects));
        },
        selectProject(state, action) {
            state.selectedProjectId = action.payload;
        },

        addTask(state, action) {
            state.projects
                .find((p) => p.id === state.selectedProjectId)
                .tasks.push(action.payload);
            localStorage.setItem("projects", JSON.stringify(state.projects));
        },
        deleteTask(state, action) {
            const project = state.projects.find(
                (p) => p.id === state.selectedProjectId,
            );
            if (project) {
                project.tasks = project.tasks.filter(
                    (t) => t.id !== action.payload,
                );
            }
            localStorage.setItem("projects", JSON.stringify(state.projects));
        },
        updateTask(state, action) {
            const updatedTask = action.payload;
            const project = state.projects.find(
                (p) => p.id === state.selectedProjectId,
            );
            if (project) {
                const taskIndex = project.tasks.findIndex(
                    (t) => t.id === updatedTask.id,
                );
                if (taskIndex !== -1) {
                    project.tasks[taskIndex] = updatedTask;
                }
            }
            localStorage.setItem("projects", JSON.stringify(state.projects));
        },
        updateTaskStatus(state, action) {
            const { id, category } = action.payload;
            const project = state.projects.find(
                (p) => p.id === state.selectedProjectId,
            );
            if (project) {
                const task = project.tasks.find((t) => t.id === id);
                if (task) {
                    task.category = category;
                }
            }
            localStorage.setItem("projects", JSON.stringify(state.projects));
        },
    },
});

export const tasksAction = taskSlice.actions;

export default taskSlice.reducer;

