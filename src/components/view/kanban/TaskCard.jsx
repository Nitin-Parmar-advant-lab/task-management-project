import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import highPriority from "../../assets/high-priority.svg";
import mediumPriority from "../../assets/medium-priority.svg";
import lowPriority from "../../assets/low-priority.svg";

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
            className={`bg-white dark:bg-gray-800 border border-[#E8E8ED] dark:border-gray-700 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between ${isOverlay ? "cursor-grabbing shadow-2xl scale-105" : "cursor-pointer"}`}
        >
            <h3 className="font-normal text-lg dark:text-white">{task.title}</h3>

            <p className="text-sm text-[#86868B] dark:text-gray-400 line-clamp-3 mb-4">{task.description}</p>

            <div className="flex justify-between items-center text-xs ">
                <span className="text-[#A1A1A6] font-medium">
                    {task.dueDate && `Due: ${formattedDate}`}
                </span>
                {prioritySvg ? (
                    <img
                        src={prioritySvg}
                        alt={`${task.priority} Priority`}
                        className="w-4"
                    />
                ) : (
                    <span />
                )}
            </div>
        </div>
    );
}
