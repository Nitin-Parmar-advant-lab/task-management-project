import KanbanColumn from "./KanbanColumn";
import useFetchTask from "../../../hooks/useFetchTask";
import { useState } from "react";
import Modal from "../../ui/Modal";
import TaskForm from "../../TaskForm";

export default function KanbanView() {
    const { todoTasks, inProgressTasks, completedTasks } = useFetchTask()

    const [selectedTask, setSelectedTask] = useState(null);
    function onCardClick(task) {
        setSelectedTask(task);
    }

    return (
        <div
            id="kanban-view"
            className="flex gap-6 px-5 h-full overflow-x-auto p-2"
        >
            <div id="todo-task" className="flex-1 min-w-75">
                <KanbanColumn title="Todo" tasks={todoTasks} onCardClick={onCardClick}/>
            </div>

            <div id="in-progress-task" className="flex-1 min-w-75">
                <KanbanColumn title="In Progress" tasks={inProgressTasks} onCardClick={onCardClick}/>
            </div>

            <div id="completed-task" className="flex-1 min-w-75">
                <KanbanColumn title="Completed" tasks={completedTasks} onCardClick={onCardClick}/>
            </div>

            <Modal
                isOpen={selectedTask}
                onClose={() => setSelectedTask(null)}
                modalWidth="min-w-2xl"
            >
                <TaskForm
                    key={selectedTask?.id || "new-task"}
                    onClose={() => setSelectedTask(null)}
                    task={selectedTask}
                />
            </Modal>
        </div>
    );
}