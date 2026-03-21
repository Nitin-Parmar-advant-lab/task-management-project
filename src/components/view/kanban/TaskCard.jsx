import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import highPriority from "../../../assets/high-priority.svg";
import mediumPriority from "../../../assets/medium-priority.svg";
import lowPriority from "../../../assets/low-priority.svg";

export default function TaskCard({ task, onCardClick, isOverlay }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: task.id,
        });

    const isActualDragging = isDragging && !isOverlay;

    const style = {
        transform: isActualDragging ? null : CSS.Translate.toString(transform),
        opacity: isActualDragging ? 0.3 : 1,
        zIndex: isActualDragging ? 0 : isOverlay ? 1000 : "auto",
    };

    const priorityIcons = {
        high: highPriority,
        medium: mediumPriority,
        low: lowPriority,
    };

    const prioritySvg = priorityIcons[task.priority] || null;

    const formattedDate =
        task.dueDate &&
        new Date(task.dueDate).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    const dragProps = isOverlay ? {} : { ...listeners, ...attributes };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...dragProps}
            onClick={() => onCardClick && onCardClick(task)}
            className={`bg-[#FFFFFF] dark:bg-[#161617] border border-[#E8E8ED] dark:border-[#2D2D2F] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-2 ${isOverlay ? "cursor-grabbing shadow-2xl scale-105 border-[#0066CC] dark:border-[#2997FF]" : "cursor-pointer active:scale-[0.98]"}`}
        >
            <h3 className="font-bold text-sm text-[#1D1D1F] dark:text-[#F5F5F7] line-clamp-2">{task.title}</h3>

            <p className="text-sm text-[#86868B] dark:text-[#A1A1A6] line-clamp-3 mb-4 font-medium">{task.description}</p>

            <div className="flex justify-between items-center text-[10px] pt-4 mt-auto border-t border-[#E8E8ED]/50 dark:border-[#2D2D2F]/50">
                <span className="text-[#A1A1A6] dark:text-[#6E6E73] font-bold uppercase tracking-wider">
                    {task.dueDate ? formattedDate : ""}
                </span>
                {prioritySvg ? (
                    <img
                        src={prioritySvg}
                        alt={`${task.priority} Priority`}
                        className="w-4 dark:invert"
                    />
                ) : (
                    <span />
                )}
            </div>
        </div>
    );
}
