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
        <div className="w-full pb-4 px-2 md:px-4">
            <div
                className="hidden md:grid grid-cols-[1.5fr_3fr_1fr_0.5fr] text-[10px] font-bold uppercase tracking-widest text-[#86868B] dark:text-[#A1A1A6] px-6 py-4 
                sticky top-0 bg-[#F5F5F7]/95 dark:bg-[#000000]/95 backdrop-blur-md z-10 border-b border-[#E8E8ED] dark:border-[#2D2D2F]"
            >
                <div>Title</div>
                <div>Description</div>
                <div className="text-center">Due Date</div>
                <div className="text-right">Priority</div>
            </div>

            <div id="listview" className="flex flex-col gap-6 pt-4">
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
                    modalWidth="w-[95%] sm:w-[85%] md:w-[80%] lg:max-w-2xl"
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
