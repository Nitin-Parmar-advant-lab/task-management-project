import { useSelector } from "react-redux";

export default function useFetchTask() {
    const selectedProjectId = useSelector((state) => state.selectedProjectId);
    const projects = useSelector((state) => state.projects);
    const activeProject = projects.find((p) => p.id === selectedProjectId);

    const tasks = activeProject?.tasks || [];

    const todoTasks = tasks.filter((t) => t.category === "Todo");
    const inProgressTasks = tasks.filter((t) => t.category === "In Progress");
    const completedTasks = tasks.filter((t) => t.category === "Completed");
    return { todoTasks, inProgressTasks, completedTasks };
}
