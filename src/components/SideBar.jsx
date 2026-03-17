import { useSelector, useDispatch } from "react-redux";
import { tasksAction } from "../store/taskSlice";

export default function SideBar({ onAddProject }) {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects);
    const selectedProjectId = useSelector((state) => state.selectedProjectId);

    const activeProject = projects.find((p) => p.id === selectedProjectId);

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

            <div id="Projects" className="flex-1 p-4">
                <p className="font-medium mb-3">Projects:</p>

                <ul className="space-y-3">
                    {projects.map((project) => (
                        <li
                            key={project.id}
                            onClick={() =>
                                dispatch(tasksAction.selectProject(project.id))
                            }
                            className={`p-3 rounded-xl ${activeProject.id === project.id ? "bg-gray-400" : "bg-gray-300"}`}
                        >
                            {project.title}
                        </li>
                    ))}
                </ul>
            </div>

            <div id="Footer " className="border-t border-gray-400 text-center">
                <div className="p-3 border-b border-gray-400 cursor-pointer">
                    dark
                </div>

                <div className="p-3 text-red-500 cursor-pointer">logout</div>
            </div>
        </div>
    );
}
