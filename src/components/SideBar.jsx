import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tasksAction } from "../store/taskSlice";
import { authActions } from "../store/authSlice";
import Modal from "./ui/Modal";
import { useNavigate } from "react-router-dom";

import binLogo from "../components/assets/bin-logo.svg";
import { Link } from "react-router";

import { uiActions } from "../store/uiSlice";

export default function SideBar({ onAddProject, onShowLoginModal }) {
    const isDarkMode = useSelector((state) => state.ui.isDarkMode);
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.tasks.projects);
    const selectedProjectId = useSelector(
        (state) => state.tasks.selectedProjectId,
    );
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/login");
    };

    function handleAddProject() {
        if (isLoggedIn) {
            onAddProject();
        } else {
            onShowLoginModal();
        }
    }

    function handleDeleteClick(e, project) {
        e.stopPropagation();
        if (isLoggedIn) {
            setProjectToDelete(project);
            setIsConfirmModalOpen(true);
        } else {
            onShowLoginModal();
        }
    }

    function handleConfirmDelete() {
        if (projectToDelete) {
            dispatch(tasksAction.deleteProject(projectToDelete.id));
            setIsConfirmModalOpen(false);
            setProjectToDelete(null);
        }
    }

    function handleLogout() {
        dispatch(authActions.logout());
    }

    return (
        <>
            {/* Backdrop for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => dispatch(uiActions.closeSidebar())}
                />
            )}

            <div
                id="sidebar"
                className={`fixed inset-y-0 left-0 z-50 w-64 h-full border-r border-[#E8E8ED] dark:border-gray-700 flex flex-col bg-white dark:bg-gray-900 transition-all duration-300 transform lg:relative lg:translate-x-0 ${isSidebarOpen ? "translate-x-0 " : "-translate-x-full"}`}
            >
                <div
                    id="Logo"
                    className="border-b border-[#E8E8ED] dark:border-gray-700 p-4 text-center"
                >
                    <p className="text-3xl font-semibold text-[#1D1D1F] dark:text-white">
                        TM
                    </p>
                </div>

                <div
                    id="Create-Project"
                    className="border-b border-gray-400 dark:border-gray-400 p-4 text-center"
                >
                    <button
                        onClick={handleAddProject}
                        className="w-full py-2 dark:bg-gray-700 bg-gray-300 text-black  dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-800 transition-colors duration-300"
                    >
                        Create Project
                    </button>
                </div>

                <div
                    id="Projects"
                    className="flex-1 p-4 overflow-auto no-scrollbar"
                >
                    <p className="font-medium mb-3 dark:text-white">
                        Projects:
                    </p>

                    <ul className="space-y-3">
                        {projects.map((project) => (
                            <li
                                key={project.id}
                                onClick={() => {
                                    dispatch(
                                        tasksAction.selectProject(project.id),
                                    );
                                    dispatch(uiActions.closeSidebar());
                                }}
                                className={`p-3 rounded-xl flex items-center justify-between px-4 cursor-pointer transition-colors ${selectedProjectId === project.id ? "bg-gray-400 dark:bg-gray-700 dark:text-white" : "bg-gray-300 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                            >
                                <span className="truncate flex-1">
                                    {project.title}
                                </span>
                                {selectedProjectId === project.id && (
                                    <button
                                        onClick={(e) =>
                                            handleDeleteClick(e, project)
                                        }
                                        className="p-1 cursor-pointer rounded-full transition-colors"
                                    >
                                        <img
                                            src={binLogo}
                                            alt="delete project"
                                            className="w-5 h-5 "
                                        />
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <Modal
                    isOpen={isConfirmModalOpen}
                    onClose={() => setIsConfirmModalOpen(false)}
                    modalWidth="max-w-sm"
                >
                    <div className="text-center p-1">
                        <h3 className="text-xl font-bold mb-4">
                            Confirm Deletion
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure? <br />
                            All tasks in this project will be removed.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setIsConfirmModalOpen(false)}
                                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-6 py-2 bg-red-200 text-white rounded-lg hover:bg-red-300 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </Modal>

                <div
                    id="Footer "
                    className="border-t border-gray-300 dark:border-gray-700 text-center"
                >
                    <button
                        onClick={() => {
                            dispatch(uiActions.toggleDarkMode());
                        }}
                        className="w-full p-3 border-b border-gray-400 dark:border-gray-700 cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors dark:text-white"
                    >
                        <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                    </button>

                    {isLoggedIn ? (
                        <div
                            onClick={handleLogout}
                            className=" p-3 text-red-500 font-medium cursor-pointer hover:bg-red-50"
                        >
                            logout
                        </div>
                    ) : (
                        <div
                            className="p-3 text-gray-600 font-medium cursor-pointer hover:bg-gray-100"
                            onClick={handleClick}
                        >
                            login
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
