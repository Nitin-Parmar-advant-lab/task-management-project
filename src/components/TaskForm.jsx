import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksAction } from "../store/taskSlice";

const INITIAL_TASK = {
    title: "",
    description: "",
    priority: "",
    category: "Todo",
    dueDate: "",
};

export default function TaskForm({ onClose, task }) {
    const dispatch = useDispatch();
    const selectedProjectId = useSelector((state) => state.selectedProjectId);

    const [formData, setFormData] = useState(task || INITIAL_TASK);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            ...formData,
            id: task?.id || crypto.randomUUID(),
            projectId: selectedProjectId,
        };

        console.log(newTask);

        dispatch(
            task?.id
                ? tasksAction.updateTask(newTask)
                : tasksAction.addTask(newTask),
        );

        setFormData(INITIAL_TASK);

        if (onClose) onClose();
    };

    return (
        <div className="w-full max-w-2xl ">
            <div className="flex items-center justify-betw  een mb-6">
                <h3 className="text-xl text-gray-800 m-0">
                    {task ? "Update Task" : "Create New Task"}
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <input
                    className="h-8 px-2 outline-gray-400 rounded-md"
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    className="py-1 px-2 outline-gray-400 rounded-md"
                    name="description"
                    placeholder="Task Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                />
                <div className="flex justify-between items-center px-5 ">
                    <div>
                        <label htmlFor="priority">Priority :</label>
                        <select
                            className="outline-none"
                            name="priority"
                            id="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            required
                        >
                            <option value="no-priority" defaultChecked>
                                Priority
                            </option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="category">Category :</label>
                        <select
                            className="outline-none"
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
                    <div>
                        <label htmlFor="dueDate">Due date :</label>
                        <input
                            id="dueDate"
                            className="outline-gray-400 rounded-md px-2 py-1"
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between gap-8 px-8">
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-4 border-none w-1/2 cursor-pointer rounded-md bg-amber-100"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="p-4 border-none w-1/2 cursor-pointer rounded-md bg-amber-100"
                    >
                        {task ? "Update Task" : "Save Task"}
                    </button>
                </div>
            </form>
        </div>
    );
}
