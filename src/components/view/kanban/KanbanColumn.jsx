import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";


export default function KanbanColumn({ id, title, tasks, onCardClick }) {
    const { setNodeRef, isOver } = useDroppable({
        id: id,
    });

    const bgClass = isOver ? "bg-gray-300 dark:bg-gray-800" : "bg-gray-200 dark:bg-gray-900";

    return (
        <div
            ref={setNodeRef}
            className={`${bgClass} rounded-xl p-4 h-full flex flex-col transition-colors duration-200`}
        >
            <p className="text-lg font-normal mb-4 text-center dark:text-white">
                {title} <span className="text-gray-500 dark:text-gray-400">({tasks.length})</span>
            </p>

            <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
                {tasks.length === 0 && (
                    <div className="text-gray-400 text-sm text-center py-20">
                        No tasks yet
                    </div>
                )}
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onCardClick={onCardClick}
                    />
                ))}
            </div>
        </div>
    );
}
