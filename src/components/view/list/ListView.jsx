import { useState } from "react";
import useFetchTask from "../../../hooks/useFetchTask";
import ListRow from "./ListRow";
import Modal from "../../ui/Modal";
import TaskForm from "../../TaskForm";

export default function ListView() {
    const { todoTasks, inProgressTasks, completedTasks } = useFetchTask();

    const [selectedTask, setSelectedTask] = useState(null);
    function onCardClick(task) {
        setSelectedTask(task);
    }

    return (
        <div className="w-full pb-4 px-4 ">
            <div
                className="pl-5 grid grid-cols-[1fr_4fr_.5fr_.2fr] text-xs font-semibold uppercase tracking-wider text-[#86868B] border-b border-[#E8E8ED] px-3 py-3 
                sticky top-0 bg-[#F5F5F7]/95 backdrop-blur-md dark:bg-[#000000]/95 dark:text-gray-400 z-30"
            >
                <div>Title</div>
                <div>Description</div>
                <div>Due Date</div>
                <div>Priority</div>
            </div>

            <div id="listview" className="flex flex-col gap-4 pt-2">
                {todoTasks.length > 0 && (
                    <ListRow
                        id="todo-task"
                        title="Todo"
                        tasks={todoTasks}
                        onCardClick={onCardClick}
                    />
                )}

                {inProgressTasks.length > 0 && (
                    <ListRow
                        id="in-progress-task"
                        title="In Progress"
                        tasks={inProgressTasks}
                        onCardClick={onCardClick}
                    />
                )}

                {completedTasks.length > 0 && (
                    <ListRow
                        id="completed-task"
                        title="Completed"
                        tasks={completedTasks}
                        onCardClick={onCardClick}
                    />
                )}

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
        </div>
    );
}
