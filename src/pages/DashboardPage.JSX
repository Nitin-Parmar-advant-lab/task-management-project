import { useState } from "react";
import { useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import KanbanView from "../components/view/kanban/KanbanView";
import ListView from "../components/view/list/ListView";
import Modal from "../components/ui/Modal";
import TaskForm from "../components/TaskForm";
import ProjectForm from "../components/ProjectForm";
import LoginModal from "../components/LoginModal";

export default function DashboardPage() {
    const [view, setView] = useState("kanban");
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const selectedProjectId = useSelector(
        (state) => state.tasks.selectedProjectId,
    );
    const projects = useSelector((state) => state.tasks.projects);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const selectedProject = projects.find((p) => p.id === selectedProjectId);

    function handleCreateTaskModal() {
        if (isLoggedIn) {
            setIsTaskModalOpen((prevs) => !prevs);
        } else {
            setIsLoginModalOpen(true);
        }
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <SideBar
                onAddProject={() => setIsProjectModalOpen(true)}
                onShowLoginModal={() => setIsLoginModalOpen(true)}
            />
            <Modal
                isOpen={isProjectModalOpen}
                onClose={() => setIsProjectModalOpen(false)}
                modalWidth="min-w-sm"
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
                    onViewChange={setView}
                    projectTitle={selectedProject?.title || "Select a Project"}
                />

                <div className="flex-1 overflow-y-auto ">
                    {view === "kanban" ? <KanbanView /> : <ListView />}
                </div>

                <Modal
                    isOpen={isTaskModalOpen}
                    onClose={() => setIsTaskModalOpen(false)}
                    modalWidth="min-w-2xl"
                >
                    <TaskForm
                        key="create-task"
                        onClose={() => setIsTaskModalOpen(false)}
                    />
                </Modal>

                <Modal
                    isOpen={isLoginModalOpen}
                    onClose={() => setIsLoginModalOpen(false)}
                    modalWidth="max-w-md"
                >
                    <LoginModal onClose={() => setIsLoginModalOpen(false)} />
                </Modal>
            </div>
        </div>
    );
}
