import highPriority from "../../../assets/high-priority.svg";
import mediumPriority from "../../../assets/medium-priority.svg";
import lowPriority from "../../../assets/low-priority.svg";

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
            className="flex flex-col md:grid md:grid-cols-[1.5fr_3fr_1fr_0.5fr] md:items-center bg-[#FFFFFF] dark:bg-[#161617] border border-[#E8E8ED] dark:border-[#2D2D2F] p-4 md:px-6 md:py-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer gap-2 md:gap-4 hover:scale-[1.01] active:scale-[0.99]"
        >
            <div className="flex items-center justify-between md:contents">
                <div className="font-bold text-[#1D1D1F] dark:text-[#F5F5F7] line-clamp-1 md:font-medium">
                    {task.title}
                </div>

                <div className="md:hidden">
                    {prioritySvg && (
                        <img
                            src={prioritySvg}
                            alt="Priority"
                            className="w-4 dark:invert"
                        />
                    )}
                </div>
            </div>

            <div className="text-sm text-[#86868B] dark:text-[#A1A1A6] line-clamp-2 md:line-clamp-1 font-medium">
                {task.description}
            </div>

            <div className="text-[10px] md:text-xs text-[#A1A1A6] dark:text-[#6E6E73] md:text-center font-semibold">
                {formattedDate ? (
                    <>
                        <span className="md:hidden opacity-50">DUE: </span>
                        {formattedDate}
                    </>
                ) : (
                    ""
                )}
            </div>


            <div className="hidden md:flex justify-end pr-2">
                {prioritySvg ? (
                    <img
                        src={prioritySvg}
                        alt="Priority"
                        className="w-4 dark:invert-75"
                    />
                ) : (
                    <span />
                )}
            </div>
        </div>
    );
}
