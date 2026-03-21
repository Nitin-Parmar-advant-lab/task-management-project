import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksAction } from "../../store/taskSlice";

const SortSection = memo(() => {
    const dispatch = useDispatch();
    const sortBy = useSelector((state) => state.tasks.sortBy);

    const handleSortChange = (sortKey) => {
        dispatch(tasksAction.setSort(sortKey));
    };

    return (
        <div id="short-by" className="flex flex-col text-center px-4 py-1">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A6] border-b border-[#E8E8ED] dark:border-[#2D2D2F] pb-1 mb-2">
                Sort by
            </div>
            <div className="flex flex-col gap-2 mt-2">
                <button
                    onClick={() => handleSortChange("createdAt")}
                    className={`border border-gray-200 dark:border-gray-600 rounded-md px-1 py-1 hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-white transition-colors ${
                        sortBy === "createdAt" ? "bg-blue-50 dark:bg-blue-900 font-medium" : ""
                    }`}
                >
                    Created at
                </button>
                <button
                    onClick={() => handleSortChange("dueDate")}
                    className={`border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-white transition-colors ${
                        sortBy === "dueDate" ? "bg-blue-50 dark:bg-blue-900 font-medium" : ""
                    }`}
                >
                    Due date
                </button>
            </div>
        </div>
    );
});

export default SortSection;