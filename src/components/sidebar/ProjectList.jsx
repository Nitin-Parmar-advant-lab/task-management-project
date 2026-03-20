import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksAction } from "../../store/taskSlice";
import { uiActions } from "../../store/uiSlice";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import binLogo from "../../assets/bin-logo.svg";

export default function ProjectList() {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.tasks.projects);
    const selectedProjectId = useSelector((state) => state.tasks.selectedProjectId);

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    function handleDeleteClick(e, project) {
        e.stopPropagation();
        setProjectToDelete(project);
        setIsConfirmModalOpen(true);
    }

    function handleConfirmDelete() {
        if (projectToDelete) {
            dispatch(tasksAction.deleteProject(projectToDelete.id));
            setIsConfirmModalOpen(false);
            setProjectToDelete(null);
        }
    }

    return (
        <>
            <div id="Projects" className="flex-1 p-4 overflow-auto no-scrollbar">
                <p className="font-medium mb-3 text-[#86868B] dark:text-[#A1A1A6] text-xs uppercase tracking-wider">Projects</p>
                <ul className="space-y-1">
                    {projects.map((project) => (
                        <li
                            key={project.id}
                            onClick={() => {
                                dispatch(tasksAction.selectProject(project.id));
                                dispatch(uiActions.closeSidebar());
                            }}
                            className={`p-2.5 rounded-lg flex items-center justify-between px-4 cursor-pointer transition-all duration-200 ${
                                selectedProjectId === project.id
                                    ? "bg-[#0066CC] text-white shadow-sm"
                                    : "bg-transparent text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#1D1D1F]"
                            }`}
                        >
                            <span className="truncate flex-1 font-medium">{project.title}</span>
                            
                            {selectedProjectId === project.id && (
                                <button
                                    onClick={(e) => handleDeleteClick(e, project)}
                                    className="p-1 cursor-pointer rounded-full transition-colors hover:bg-[#86868B]/20"
                                >
                                    <img src={binLogo} alt="delete project" className="w-5 h-5 dark:invert" />
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <ConfirmDeleteModal
                isOpen={isConfirmModalOpen}
                onClose={() => {
                    setIsConfirmModalOpen(false);
                    setProjectToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}