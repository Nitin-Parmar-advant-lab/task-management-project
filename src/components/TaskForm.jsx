import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksAction } from "../store/taskSlice";

const INITIAL_TASK = {
    title: "",
    description: "",
    priority: "no-priority",
    category: "Todo",
    dueDate: "",
};

export default function TaskForm({ onClose, task }) {
    const dispatch = useDispatch();
    const selectedProjectId = useSelector((state) => state.tasks.selectedProjectId);

    const [formData, setFormData] = useState(task || INITIAL_TASK);

    const handleChange = (e) => {
        if(e.target.name === "dueDate") {
            const selectedDate = new Date(e.target.value);
            const today = new Date();
            if(selectedDate <= today) {
                alert("Due date cannot be in the past");
                return;
            }
            setFormData({
                ...formData,
                dueDate: e.target.value,
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            ...formData,
            id: task?.id || crypto.randomUUID(),
            projectId: selectedProjectId,
        };

        dispatch(
            task?.id
                ? tasksAction.updateTask(newTask)
                : tasksAction.addTask(newTask),
        );

        setFormData(INITIAL_TASK);
        if (onClose) onClose();
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-xl text-[#1D1D1F] dark:text-[#F5F5F7] m-0 font-semibold">
                    {task ? "Update Task" : "Create New Task"}
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    className="h-10 px-3 bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-[#E8E8ED] dark:border-[#2D2D2F] text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-[#A1A1A6] outline-none focus:ring-2 focus:ring-[#0066CC]/20 rounded-xl w-full transition-all"
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    className="py-2 px-3 bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-[#E8E8ED] dark:border-[#2D2D2F] text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-[#A1A1A6] outline-none focus:ring-2 focus:ring-[#0066CC]/20 rounded-xl w-full resize-none transition-all"
                    name="description"
                    placeholder="Task Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-2 px-1 md:px-1">
                    <div id="priority" className="flex flex-col md:flex-row md:items-center gap-1 md:gap-1.5 w-full md:w-auto">
                        <label htmlFor="priority" className="text-xs font-semibold uppercase text-[#86868B] dark:text-[#A1A1A6] whitespace-nowrap shrink-0">Priority</label>
                        <select
                            className="outline-none bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-[#E8E8ED] dark:border-[#2D2D2F] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-lg px-2 py-1 w-full md:w-auto focus:ring-2 focus:ring-[#0066CC]/20 transition-all cursor-pointer"
                            name="priority"
                            id="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            required
                        >
                            <option value="no-priority">Select Priority</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    
                    <div id="category" className="flex flex-col md:flex-row md:items-center gap-1 md:gap-1.5 w-full md:w-auto">
                        <label htmlFor="category" className="text-xs font-semibold uppercase text-[#86868B] dark:text-[#A1A1A6] whitespace-nowrap shrink-0">Category</label>
                        <select
                            className="outline-none bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-[#E8E8ED] dark:border-[#2D2D2F] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-lg px-2 py-1 w-full md:w-auto focus:ring-2 focus:ring-[#0066CC]/20 transition-all cursor-pointer"
                            name="category"
                            id="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="Todo">Todo</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    
                    <div id="dueDate" className="flex flex-col md:flex-row md:items-center gap-1 md:gap-1.5 w-full md:w-auto">
                        <label htmlFor="dueDate" className="text-xs font-semibold uppercase text-[#86868B] dark:text-[#A1A1A6] whitespace-nowrap shrink-0">Due Date</label>
                        <input
                            id="dueDate"
                            className="outline-none bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-[#E8E8ED] dark:border-[#2D2D2F] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-lg px-2 py-1 w-full md:w-auto focus:ring-2 focus:ring-[#0066CC]/20 transition-all cursor-pointer"
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4 px-1 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="py-3 w-1/2 cursor-pointer rounded-xl bg-[#F5F5F7] hover:bg-[#E8E8ED] dark:bg-[#1D1D1F] dark:hover:bg-[#2D2D2F] transition-all font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] shadow-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="py-3 w-1/2 cursor-pointer rounded-xl bg-[#0066CC] hover:bg-[#0071E3] dark:bg-[#2997FF] dark:hover:bg-[#5AC8FA] transition-all font-semibold text-white shadow-lg shadow-[#0066CC]/20"
                    >
                        {task ? "Update Task" : "Save Task"}
                    </button>
                </div>
            </form>
        </div>
    );
}