import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";


export default function KanbanColumn({ id, title, tasks, onCardClick }) {
    const { setNodeRef, isOver } = useDroppable({
        id: id,
    });

    const bgClass = isOver ? "bg-[#E8E8ED]/80 dark:bg-[#2D2D2F]" : "bg-[#E8E8ED]/40 dark:bg-[#1D1D1F]";

    return (
        <div
            ref={setNodeRef}
            className={`${bgClass} rounded-2xl p-4 h-full flex flex-col transition-all duration-300 backdrop-blur-sm border border-[#E8E8ED]/50 dark:border-[#2D2D2F]/50`}
        >
            <p className="text-sm font-bold mb-4 text-[#1D1D1F] dark:text-[#F5F5F7] flex items-center justify-between px-2">
                <span className="uppercase tracking-widest text-[10px] opacity-70">{title}</span>
                <span className="text-[#86868B] dark:text-[#A1A1A6] text-xs">({tasks.length})</span>
            </p>

            <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
                {tasks.length === 0 && (
                    <div className="text-[#A1A1A6] dark:text-[#6E6E73] text-xs py-20 text-center font-bold uppercase tracking-widest opacity-50">
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
