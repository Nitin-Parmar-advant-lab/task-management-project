
import { memo, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksAction } from "../../store/taskSlice";
import RelativeModal from "../ui/RelativeModal";
import Modal from "../ui/Modal";
import DateRangeForm from "../DateRangeForm";

const CATEGORIES = ["All", "Todo", "In Progress", "Completed"];
const PRIORITIES = ["All", "High", "Medium", "Low"];

const FilterSection = memo(({ isDateModalOpen, setIsDateModalOpen }) => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.tasks.filter);

    const [activeSubMenu, setActiveSubMenu] = useState(null);

    const selectedCategory = useMemo(() => filter.category === "all" ? "All" : filter.category, [filter.category]);
    const selectedPriority = useMemo(() => filter.priority === "all" ? "All" : filter.priority, [filter.priority]);

    const handleFilterChange = useCallback((type, value) => {
        dispatch(tasksAction.setFilter({ [type]: value === "All" ? "all" : value }));
    }, [dispatch]);

    return (
        <div id="filter" className="flex flex-col text-center px-4 py-1">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A6] border-b border-[#E8E8ED] dark:border-[#2D2D2F] pb-1 mb-2">
                Filter
            </div>

            <div className="flex flex-col gap-2 mt-2">
                <div
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("category")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                >
                    <button
                        className={`w-full border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-white transition-colors ${
                            filter.category !== "all" ? "bg-blue-50 dark:bg-blue-900 font-medium" : ""
                        }`}
                    >
                        Category
                    </button>
                    {activeSubMenu === "category" && (
                        <RelativeModal
                            texts={CATEGORIES}
                            selectedValue={selectedCategory}
                            onClick={(text) => handleFilterChange("category", text)}
                        />
                    )}
                </div>

                <div
                    className="relative"
                    onMouseEnter={() => setActiveSubMenu("priority")}
                    onMouseLeave={() => setActiveSubMenu(null)}
                >
                    <button
                        className={`w-full border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-white transition-colors ${
                            filter.priority !== "all" ? "bg-blue-50 dark:bg-blue-900 font-medium " : ""
                        }`}
                    >
                        Priority
                    </button>
                    {activeSubMenu === "priority" && (
                        <RelativeModal
                            texts={PRIORITIES}
                            selectedValue={selectedPriority}
                            onClick={(text) => handleFilterChange("priority", text)}
                        />
                    )}
                </div>

                <button
                    onClick={() => setIsDateModalOpen(true)}
                    className={`border text-sm border-gray-200 dark:border-gray-600 rounded-md px-1 py-1 hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-white transition-colors ${
                        filter.startDate || filter.endDate ? "bg-blue-50 dark:bg-blue-900 font-medium" : ""
                    }`}
                >
                    Date range
                </button>

                <Modal isOpen={isDateModalOpen} onClose={() => setIsDateModalOpen(false)}>
                    <DateRangeForm onClose={() => setIsDateModalOpen(false)} />
                </Modal>
            </div>
        </div>
    );
});

export default FilterSection;