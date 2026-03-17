import { useState } from "react";
import { useSelector } from "react-redux";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import KanbanView from "./components/view/kanban/KanbanView";
import ListView from "./components/view/list/ListView";
import Modal from "./components/ui/Modal";
import TaskForm from "./components/TaskForm";
import ProjectForm from "./components/ProjectForm";

export default function App() {
    const [view, setView] = useState("kanban");
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

    const selectedProjectId = useSelector((state) => state.selectedProjectId);
    const projects = useSelector((state) => state.projects);
    const selectedProject = projects.find((p) => p.id === selectedProjectId);

    function handleCreateTaskModal() {
        setIsTaskModalOpen((prevs) => !prevs);
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <SideBar onAddProject={() => setIsProjectModalOpen(true)} />
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
                        onClose={handleCreateTaskModal}
                    />
                </Modal>
            </div>
        </div>
    );
}
