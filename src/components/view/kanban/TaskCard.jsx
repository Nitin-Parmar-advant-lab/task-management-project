import highPriority from "../../../../public/high-priority.svg";
import mediumPriority from "../../../../public/medium-priority.svg";
import lowPriority from "../../../../public/low-priority.svg";

export default function TaskCard({ task, onCardClick }) {
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
            className="bg-white border border-gray-300 rounded-lg p-3 shadow-sm hover:shadow-md flex flex-col justify-between cursor-pointer"
        >
            <h3 className="font-normal text-lg">{task.title}</h3>

            <p className="text-sm text-gray-600 ">{task.description}</p>

            <div className="flex justify-between items-center mt-5 text-sm ">
                <span className="text-gray-500 ">
                    {task.dueDate && `Due: ${formattedDate}`}
                </span>
                {prioritySvg ? (
                    <img src={prioritySvg} alt="Priority" className="w-4" />
                ) : (
                    <span />
                )}
            </div>
        </div>
    );
}
