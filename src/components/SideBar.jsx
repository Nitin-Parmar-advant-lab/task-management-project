import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tasksAction } from "../store/taskSlice";
import Modal from "./ui/Modal";

import binLogo from "../components/assets/bin-logo.svg";

export default function SideBar({ onAddProject }) {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects);
    const selectedProjectId = useSelector((state) => state.selectedProjectId);

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    // const activeProject = projects.find((p) => p.id === selectedProjectId);

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
        <div
            id="sidebar"
            className="w-64 h-screen border-r border-gray-400 flex flex-col "
        >
            <div id="Logo" className="border-b border-gray-400 p-4 text-center">
                <p className="text-3xl font-semibold">TM</p>
            </div>

            <div
                id="Create-Project"
                className="border-b border-gray-400 p-4 text-center"
            >
                <button
                    onClick={onAddProject}
                    className="w-full py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                    Create Project
                </button>
            </div>

            <div
                id="Projects"
                className="flex-1 p-4 overflow-auto no-scrollbar"
            >
                <p className="font-medium mb-3">Projects:</p>

                <ul className="space-y-3">
                    {projects.map((project) => (
                        <li
                            key={project.id}
                            onClick={() =>
                                dispatch(tasksAction.selectProject(project.id))
                            }
                            className={`p-3 rounded-xl flex items-center justify-between px-4 ${selectedProjectId === project.id ? "bg-gray-400" : "bg-gray-300"}`}
                        >
                            <span className="truncate flex-1">{project.title}</span>
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
                    <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
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

            <div id="Footer " className="border-t border-gray-400 text-center">
                <div className="p-3 border-b border-gray-400 cursor-pointer">
                    dark
                </div>

                <div className="p-3 text-red-500 cursor-pointer">logout</div>
            </div>
        </div>
    );
}
