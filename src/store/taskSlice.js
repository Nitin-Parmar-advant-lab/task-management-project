import { createSlice } from "@reduxjs/toolkit";

const saveProjectsToLocal = (projects) => {
    const userId = localStorage.getItem("currentUserId");
    if (userId) {
        localStorage.setItem(userId, JSON.stringify(projects));
    }
};

const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        projects: [],
        selectedProjectId: null,
        sortBy: "createdAt",
        filter: {
            category: "all",
            priority: "all",
            startDate: null,
            endDate: null,
        },
        search: "",
    },
    reducers: {
        addProject(state, action) {
            state.projects.push({ ...action.payload, tasks: [] });
            saveProjectsToLocal(state.projects);
        },

        selectProject(state, action) {
            state.selectedProjectId = action.payload;
        },

        deleteProject(state, action) {
            state.projects = state.projects.filter(
                (project) => project.id !== action.payload,
            );
            if (state.selectedProjectId === action.payload) {
                state.selectedProjectId = state.projects[0]?.id || null;
            }
            saveProjectsToLocal(state.projects);
        },

        addTask(state, action) {
            state.projects
                .find((project) => project.id === state.selectedProjectId)
                .tasks.push({
                    ...action.payload,
                    createdAt: new Date().toISOString(),
                });
            saveProjectsToLocal(state.projects);
        },

        updateTask(state, action) {
            const updatedTask = action.payload;
            const project = state.projects.find(
                (project) => project.id === state.selectedProjectId,
            );
            if (project) {
                const taskIndex = project.tasks.findIndex(
                    (task) => task.id === updatedTask.id,
                );
                if (taskIndex !== -1) {
                    project.tasks[taskIndex] = updatedTask;
                }
            }
            saveProjectsToLocal(state.projects);
        },

        setSort(state, action) {
            state.sortBy = action.payload;
        },

        setFilter(state, action) {
            state.filter = { ...state.filter, ...action.payload };
        },

        setSearch(state, action) {
            state.search = action.payload;
        },

        moveTask(state, action) {
            const { taskId, newCategory } = action.payload;
            const project = state.projects.find(
                (project) => project.id === state.selectedProjectId,
            );
            if (project) {
                const task = project.tasks.find((task) => task.id === taskId);
                if (task) {
                    task.category = newCategory;
                }
            }
            saveProjectsToLocal(state.projects);
        },
        loadUserData(state, action) {
            state.projects = action.payload.projects || [];
            state.selectedProjectId = state.projects[0]?.id || null;
        },
    },
});

export const tasksAction = taskSlice.actions;

export default taskSlice.reducer;
