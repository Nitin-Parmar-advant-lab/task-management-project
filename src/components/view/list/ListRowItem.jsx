import highPriority from "../../assets/high-priority.svg";
import mediumPriority from "../../assets/medium-priority.svg";
import lowPriority from "../../assets/low-priority.svg";

export default function ListRowItem({ task, onCardClick }) {
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

    return (
        <div
            onClick={() => onCardClick(task)}
            className="grid grid-cols-[1fr_4fr_.5fr_.2fr] border p-3 rounded hover:bg-gray-50 cursor-pointer"
        >
            <div className="line-clamp-1">{task.title}</div>
            <div className="line-clamp-1">{task.description}</div>
            <div>{formattedDate}</div>
            <div>
                {prioritySvg ? (
                    <img src={prioritySvg} alt="Priority" className="w-4" />
                ) : (
                    <span />
                )}
            </div>
        </div>
    );
}
