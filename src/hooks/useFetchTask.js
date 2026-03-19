import { useSelector } from "react-redux";

export default function useFetchTask() {
    const selectedProjectId = useSelector((state) => state.tasks.selectedProjectId);
    
    const projects = useSelector((state) => state.tasks.projects);
    const sortBy = useSelector((state) => state.tasks.sortBy);
    const filter = useSelector((state) => state.tasks.filter);
    const search = useSelector((state) => state.tasks.search);

    const activeProject = projects.find((p) => p.id === selectedProjectId);
    const rawTasks = activeProject?.tasks || [];

    let processedTasks = [...rawTasks];

    if (search && search.trim() !== "") {
        processedTasks = processedTasks.filter((task) =>
            task.title.toLowerCase().includes(search.toLowerCase()),
        );
    }

    if (filter.priority !== "all") {
        processedTasks = processedTasks.filter(
            (task) => task.priority.toLowerCase() === filter.priority.toLowerCase()
        );
    }

    if (filter.category !== "all") {
        processedTasks = processedTasks.filter(
            (t) => t.category.toLowerCase() === filter.category.toLowerCase(),
        );
    }

    if (filter.startDate && filter.endDate) {
        const start = new Date(filter.startDate).getTime();
        const end = new Date(filter.endDate).getTime();

        processedTasks = processedTasks.filter((task) => {
            if (!task.dueDate) return false;
            const taskDate = new Date(task.dueDate).getTime();
            return taskDate >= start && taskDate <= end;
        });
    }

    if (sortBy === "dueDate") {
        processedTasks.sort((a, b) => {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
    } else if (sortBy === "createdAt") {
        processedTasks.sort((a, b) => {
            if (!a.createdAt) return 1;
            if (!b.createdAt) return -1;
            return new Date(b.createdAt) - new Date(a.createdAt); 
        });
    }

    const todoTasks = processedTasks.filter((t) => t.category === "Todo");
    const inProgressTasks = processedTasks.filter((t) => t.category === "In Progress");
    const completedTasks = processedTasks.filter((t) => t.category === "Completed");
    
    return { todoTasks, inProgressTasks, completedTasks };
}
