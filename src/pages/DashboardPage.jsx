import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import KanbanView from "../components/view/kanban/KanbanView";
import ListView from "../components/view/list/ListView";
import Modal from "../components/ui/Modal";
import TaskForm from "../components/TaskForm";
import ProjectForm from "../components/ProjectForm";
import { uiActions } from "../store/uiSlice";
import { tasksAction } from "../store/taskSlice";

export default function DashboardPage() {
    const dispatch = useDispatch();

    const isVerified = useSelector((state) => state.auth.isVerified);
    const view = useSelector((state) => state.ui.view);
    const selectedProjectId = useSelector(
        (state) => state.tasks.selectedProjectId,
    );

    const user = useSelector((state) => state.auth.user);

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

    useEffect(() => {
        if (isVerified && user && user.id) {
            const storedData = localStorage.getItem(`projects_${user.id}`);

            const userProjects = storedData ? JSON.parse(storedData) : [];

            dispatch(tasksAction.loadUserData({ projects: userProjects }));
        }
    }, [isVerified, user, dispatch]);

    const projects = useSelector((state) => state.tasks.projects);
    const selectedProject = projects.find((p) => p.id === selectedProjectId);

    function handleCreateTaskModal() {
        setIsTaskModalOpen((prevs) => !prevs);
    }

    if (!isVerified) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex h-screen overflow-hidden bg-[#F5F5F7] dark:bg-[#000000]">
            <SideBar onAddProject={() => setIsProjectModalOpen(true)} />
            <Modal
                isOpen={isProjectModalOpen}
                onClose={() => setIsProjectModalOpen(false)}
                modalWidth="w-[95%] max-w-md"
            >
                <ProjectForm onClose={() => setIsProjectModalOpen(false)} />
            </Modal>

            <div
                id="main-section"
                className="flex-1 flex flex-col overflow-hidden"
            >
                <TopBar
                    setCreateTaskModal={handleCreateTaskModal}
                    currentView={view}
                    onViewChange={(newView) =>
                        dispatch(uiActions.setView(newView))
                    }
                    projectTitle={selectedProject?.title || "Select a Project"}
                />

                {
                    <div className="flex-1 overflow-y-auto ">
                        {view === "kanban" ? <KanbanView /> : <ListView />}
                    </div>
                }

                <Modal
                    isOpen={isTaskModalOpen}
                    onClose={() => setIsTaskModalOpen(false)}
                    modalWidth="w-[95%] sm:w-[85%] md:w-[80%] lg:max-w-2xl"
                >
                    <TaskForm
                        key="create-task"
                        onClose={() => setIsTaskModalOpen(false)}
                    />
                </Modal>
            </div>
        </div>
    );
}
