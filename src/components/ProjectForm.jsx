import { useState } from "react";
import { useDispatch } from "react-redux";
import { tasksAction } from "../store/taskSlice";

export default function ProjectForm({ onClose }) {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newProjectId = crypto.randomUUID();
        dispatch(
            tasksAction.addProject({
                id: newProjectId,
                title: title.trim(),
            }),
        );
        dispatch(tasksAction.selectProject(newProjectId));
        setTitle("");
        onClose();
    };

    return (
        <div className="w-full max-w-sm p-2">
            <h2 className="text-xl font-bold mb-4 text-[#1D1D1F] dark:text-[#F5F5F7]">Create New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Project Title"
                        className="w-full h-12 px-4 bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-[#E8E8ED] dark:border-[#2D2D2F] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-xl outline-none focus:ring-2 focus:ring-[#0066CC] font-medium"
                        required
                    />
                </div>
                <div className="flex items-center justify-between gap-3 px-2 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-1/2 py-3 text-sm bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-[#E8E8ED] dark:border-[#2D2D2F] text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold rounded-xl hover:bg-[#E8E8ED] dark:hover:bg-[#2D2D2F] transition-all shadow-sm cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-1/2 py-3 bg-[#0066CC] dark:bg-[#2997FF] hover:bg-[#0071E3] dark:hover:bg-[#5AC8FA] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#0066CC]/20 cursor-pointer"
                    >
                        Create Project
                    </button>
                </div>
            </form>
        </div>
    );
}
