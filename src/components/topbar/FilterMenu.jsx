import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksAction } from "../../store/taskSlice";
import Button from "../ui/Button";
import RelativeModal from "../ui/RelativeModal";
import Modal from "../ui/Modal";
import DateRangeForm from "../DateRangeForm";
import { useClickOutside } from "../../hooks/useClickOutside";

export default function FilterMenu() {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.tasks.filter);
    const sortBy = useSelector((state) => state.tasks.sortBy);

    const [menuState, setMenuState] = useState({
        isFilterOpen: false,
        isDateModalOpen: false,
        activeSubMenu: null,
    });

    const handleMenuChange = (key, value) => {
        setMenuState((prev) => ({ ...prev, [key]: value }));
    };

    const filterRef = useClickOutside(
        () => handleMenuChange("isFilterOpen", false),
        menuState.isDateModalOpen,
    );

    const categories = ["All", "Todo", "In Progress", "Completed"];
    const priorities = ["All", "High", "Medium", "Low"];

    const selectedCategory =
        filter.category === "all" ? "All" : filter.category;
    const selectedPriority =
        filter.priority === "all" ? "All" : filter.priority;

    return (
        <div className="relative" ref={filterRef}>
            <Button
                style="px-4 py-1 shadow-sm/10"
                text="Filter"
                onClick={() =>
                    handleMenuChange("isFilterOpen", !menuState.isFilterOpen)
                }
            />

            {menuState.isFilterOpen && (
                <div className="absolute right-0 mt-2 mr-8 w-64 bg-[#FFFFFF] dark:bg-[#1D1D1F] border border-[#E8E8ED] dark:border-[#2D2D2F] rounded-2xl shadow-2xl z-30 py-1 scale-in-center">
                    <div className="grid grid-cols-2 divide-x-2 divide-[#E8E8ED] dark:divide-[#2D2D2F]">
                        <div
                            id="short-by"
                            className="flex flex-col text-center px-4 py-1"
                        >
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A6] border-b border-[#E8E8ED] dark:border-[#2D2D2F] pb-1 mb-2">
                                Sort by
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <button
                                    onClick={() =>
                                        dispatch(
                                            tasksAction.setSort("createdAt"),
                                        )
                                    }
                                    className={`border border-gray-200 dark:border-gray-600 rounded-md px-1 py-1 hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-white transition-colors ${sortBy === "createdAt" ? "bg-blue-50 dark:bg-blue-900 font-medium" : ""}`}
                                >
                                    Created at
                                </button>
                                <button
                                    onClick={() =>
                                        dispatch(tasksAction.setSort("dueDate"))
                                    }
                                    className={`border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-white transition-colors ${sortBy === "dueDate" ? "bg-blue-50 dark:bg-blue-900 font-medium" : ""}`}
                                >
                                    Due date
                                </button>
                            </div>
                        </div>

                        <div
                            id="filter"
                            className="flex flex-col text-center px-4 py-1"
                        >
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A6] border-b border-[#E8E8ED] dark:border-[#2D2D2F] pb-1 mb-2">
                                Filter
                            </div>

                            <div className="flex flex-col gap-2 mt-2">
                                <div
                                    className="relative"
                                    onMouseEnter={() =>
                                        handleMenuChange(
                                            "activeSubMenu",
                                            "category",
                                        )
                                    }
                                    onMouseLeave={() =>
                                        handleMenuChange("activeSubMenu", null)
                                    }
                                >
                                    <button
                                        className={`w-full border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-white transition-colors ${filter.category !== "all" ? "bg-blue-50 dark:bg-blue-900 font-medium" : ""}`}
                                    >
                                        Category
                                    </button>
                                    {menuState.activeSubMenu === "category" && (
                                        <RelativeModal
                                            texts={categories}
                                            selectedValue={selectedCategory}
                                            onClick={(text) =>
                                                dispatch(
                                                    tasksAction.setFilter({
                                                        category:
                                                            text === "All"
                                                                ? "all"
                                                                : text,
                                                    }),
                                                )
                                            }
                                        />
                                    )}
                                </div>

                                <div
                                    className="relative"
                                    onMouseEnter={() =>
                                        handleMenuChange(
                                            "activeSubMenu",
                                            "priority",
                                        )
                                    }
                                    onMouseLeave={() =>
                                        handleMenuChange("activeSubMenu", null)
                                    }
                                >
                                    <button
                                        className={`w-full border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-white transition-colors ${filter.priority !== "all" ? "bg-blue-50 dark:bg-blue-900 font-medium " : ""}`}
                                    >
                                        Priority
                                    </button>
                                    {menuState.activeSubMenu === "priority" && (
                                        <RelativeModal
                                            texts={priorities}
                                            selectedValue={selectedPriority}
                                            onClick={(text) =>
                                                dispatch(
                                                    tasksAction.setFilter({
                                                        priority:
                                                            text === "All"
                                                                ? "all"
                                                                : text,
                                                    }),
                                                )
                                            }
                                        />
                                    )}
                                </div>

                                <button
                                    onClick={() =>
                                        handleMenuChange(
                                            "isDateModalOpen",
                                            true,
                                        )
                                    }
                                    className={`border text-sm border-gray-200 dark:border-gray-600 rounded-md px-1 py-1 hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-white transition-colors ${filter.startDate || filter.endDate ? "bg-blue-50 dark:bg-blue-900 font-medium" : ""}`}
                                >
                                    Date range
                                </button>

                                <Modal
                                    isOpen={menuState.isDateModalOpen}
                                    onClose={() =>
                                        handleMenuChange(
                                            "isDateModalOpen",
                                            false,
                                        )
                                    }
                                >
                                    <DateRangeForm
                                        onClose={() =>
                                            handleMenuChange(
                                                "isDateModalOpen",
                                                false,
                                            )
                                        }
                                    />
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
