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
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Project Title"
                        className="w-full h-12 px-4 border border-gray-200 rounded-md outline-none "
                        required
                    />
                </div>
                <div className="flex items-center justify-between gap-3 px-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm bg-amber-100 font-medium rounded-md "
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-6 py-2.5 bg-amber-200 font-bold rounded-md "
                    >
                        Create Project
                    </button>
                </div>
            </form>
        </div>
    );
}
