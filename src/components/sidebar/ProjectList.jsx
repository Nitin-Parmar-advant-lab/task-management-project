import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksAction } from "../../store/taskSlice";
import { uiActions } from "../../store/uiSlice";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import binLogo from "../../assets/bin-logo.svg";

export default function ProjectList() {
    const dispatch = useDispatch();

    const projects = useSelector((state) => state.tasks.projects);

    const selectedProjectId = useSelector(
        (state) => state.tasks.selectedProjectId,
    );

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    const handleProjectSelect = useCallback(
        (projectId) => {
            dispatch(tasksAction.selectProject(projectId));
            dispatch(uiActions.closeSidebar());
        },
        [dispatch],
    );

    const handleDeleteClick = useCallback((e, project) => {
        e.stopPropagation();
        setProjectToDelete(project);
        setIsConfirmModalOpen(true);
    }, []);

    const handleConfirmDelete = useCallback(() => {
        if (projectToDelete) {
            dispatch(tasksAction.deleteProject(projectToDelete.id));
            setIsConfirmModalOpen(false);
            setProjectToDelete(null);
        }
    }, [dispatch, projectToDelete]);

    const closeConfirmModal = useCallback(() => {
        setIsConfirmModalOpen(false);
        setProjectToDelete(null);
    }, []);

    return (
        <>
            <div
                id="Projects"
                className="flex-1 p-4 overflow-auto no-scrollbar"
            >
                <p className="font-medium mb-3 text-[#86868B] dark:text-[#A1A1A6] text-xs uppercase tracking-wider">
                    Projects
                </p>
                {projects.length > 0 ? (
                    <ul className="space-y-1">
                        {projects.map((project) => (
                            <li
                                key={project.id}
                                onClick={() => handleProjectSelect(project.id)}
                                className={`p-2.5 rounded-lg flex items-center justify-between px-4 cursor-pointer transition-all duration-200 ${
                                    selectedProjectId === project.id
                                        ? "bg-[#0066CC] text-white shadow-sm"
                                        : "bg-transparent text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#1D1D1F]"
                                }`}
                            >
                                <span className="truncate flex-1 font-medium">
                                    {project.title}
                                </span>

                                {selectedProjectId === project.id && (
                                    <button
                                        onClick={(e) =>
                                            handleDeleteClick(e, project)
                                        }
                                        className="p-1 cursor-pointer rounded-full transition-colors hover:bg-[#86868B]/20"
                                    >
                                        <img
                                            src={binLogo}
                                            alt="delete project"
                                            className="w-5 h-5 dark:invert"
                                        />
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 flex justify-center items-center h-full">
                        Create new project
                    </p>
                )}
            </div>

            <ConfirmDeleteModal
                isOpen={isConfirmModalOpen}
                onClose={closeConfirmModal}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}
