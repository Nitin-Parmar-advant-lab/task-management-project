import { useState } from "react";
import useFetchTask from "../../../hooks/useFetchTask";
import ListRow from "./ListRow";
import Modal from "../../ui/Modal";
import TaskForm from "../../TaskForm";

export default function ListView() {
    const { todoTasks, inProgressTasks, completedTasks } = useFetchTask();

    const [selectedTask, setSelectedTask] = useState(null);

    const taskGroups = [
        { id: "todo-task", title: "Todo", tasks: todoTasks },
        {
            id: "in-progress-task",
            title: "In Progress",
            tasks: inProgressTasks,
        },
        { id: "completed-task", title: "Completed", tasks: completedTasks },
    ];

    const hasAnyTask = taskGroups.some((group) => group.tasks.length > 0);

    return (
        <div className="w-full pb-4 px-2 md:px-4">
            <div className="hidden md:grid grid-cols-[1.5fr_3fr_1fr_0.5fr] text-[10px] font-bold uppercase tracking-widest text-[#86868B] dark:text-[#A1A1A6] px-6 py-4 sticky top-0 bg-[#F5F5F7]/95 dark:bg-[#000000]/95 backdrop-blur-md z-10 border-b border-[#E8E8ED] dark:border-[#2D2D2F]">
                <div>Title</div>
                <div>Description</div>
                <div className="text-center">Due Date</div>
                <div className="text-right">Priority</div>
            </div>

            <div id="listview" className="flex flex-col gap-6 pt-4">
                {!hasAnyTask && (
                    <div className="text-center text-[#86868B] dark:text-[#A1A1A6] py-10">
                        No tasks yet
                    </div>
                )}

                {taskGroups.map(
                    (group) =>
                        group.tasks.length > 0 && (
                            <ListRow
                                key={group.id}
                                id={group.id}
                                title={group.title}
                                tasks={group.tasks}
                                onCardClick={setSelectedTask}
                            />
                        ),
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
