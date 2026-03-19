import { useState, useEffect, useRef } from "react";
import Button from "./ui/Button";
import RelativeModal from "./ui/RelativeModal";
import { useDispatch, useSelector } from "react-redux";
import { tasksAction } from "../store/taskSlice";
import Modal from "./ui/Modal";
import DateRangeForm from "./DateRangeForm";
import { uiActions } from "../store/uiSlice";

export default function TopBar({
    setCreateTaskModal,
    currentView,
    onViewChange,
    projectTitle,
}) {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.tasks.filter);
    const sortBy = useSelector((state) => state.tasks.sortBy);
    const search = useSelector((state) => state.tasks.search);
    const [searchTerm, setSearchTerm] = useState(search);

    const selectedCategory =
        filter.category === "all" ? "All" : filter.category;
    const selectedPriority =
        filter.priority === "all" ? "All" : filter.priority;

    const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);

    const [isDateRangeModalOpen, setIsDateRangeModalOpen] = useState(false);

    const filterRef = useRef(null);
    const viewRef = useRef(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch(tasksAction.setSearch(searchTerm));
        }, 500);

        return () => clearTimeout(handler);
    }, [searchTerm, dispatch]);

    useEffect(() => {
        function handleOutsideClick(e) {
            if (isDateRangeModalOpen) return;

            if (
                isFilterDropdownOpen &&
                filterRef.current &&
                !filterRef.current.contains(e.target)
            ) {
                setIsFilterDropdownOpen(false);
                setIsDateRangeModalOpen(false);
            }

            if (
                isViewDropdownOpen &&
                viewRef.current &&
                !viewRef.current.contains(e.target)
            ) {
                setIsViewDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isFilterDropdownOpen, isViewDropdownOpen, isDateRangeModalOpen]);

    const categories = ["All", "Todo", "In Progress", "Completed"];

    const priorities = ["All", "High", "Medium", "Low"];

    return (
        <div
            id="topbar"
            className="sticky top-0 z-50 w-full px-10 pt-4 pb-2 flex flex-col gap-6 bg-[#F5F5F7]/80 backdrop-blur-md dark:bg-[#000000]/80 dark:text-white transition-colors duration-300"
        >
            <button
                className="lg:hidden p-2 text-gray-600 dark:text-gray-300"
                onClick={() => dispatch(uiActions.toggleSidebar())}
            >
                {/* Hamburger Icon */}
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
            </button>

            <div
                id="search-section"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl h-14 flex items-center justify-between px-2 bg-white dark:bg-gray-900 backdrop-blur-md shadow-2xl"
            >
                <input
                    type="text"
                    placeholder="Search title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mx-10 px-3 border border-gray-300 rounded-md h-8 w-xl outline-none dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-gray-300 shadow-sm backdrop-blur-mx"
                />
                <Button
                    text={`${projectTitle} project`}
                    style="px-4 py-1 mr-5"
                />
            </div>

            {/* csfv = create sort filter view */}
            <div id="csfv" className="flex items-center justify-between">
                <Button
                    style="px-5 py-2"
                    text="Create task"
                    onClick={setCreateTaskModal}
                />

                <div className="helper flex items-center gap-3">
                    <div className="relative" ref={filterRef}>
                        <Button
                            style="px-4 py-1 "
                            text="Filter"
                            onClick={() => {
                                if (isViewDropdownOpen) {
                                    setIsViewDropdownOpen(false);
                                }
                                setIsFilterDropdownOpen(!isFilterDropdownOpen);
                            }}
                        />

                        {isFilterDropdownOpen && !isViewDropdownOpen && (
                            <div className="absolute right-0 mt-2 mr-8 w-60 bg-white dark:bg-gray-800 border border-[#E8E8ED] dark:border-gray-700 rounded-2xl shadow-2xl z-50 py-1 scale-in-center">
                                <div className="grid grid-cols-2 divide-x-2 divide-[#E8E8ED] dark:divide-gray-700">
                                    <div
                                        id="short-by"
                                        className="flex flex-col text-center px-4 py-1"
                                    >
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A6] border-b border-[#E8E8ED] dark:border-gray-700 pb-1 mb-2">
                                            Sort by
                                        </div>
                                        <div className="flex flex-col gap-2 mt-2">
                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        tasksAction.setSort(
                                                            "createdAt",
                                                        ),
                                                    )
                                                }
                                                className={`border border-gray-200 dark:border-gray-600 rounded-md px-1 py-1 hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-white ${sortBy === "createdAt" ? "bg-blue-50 dark:bg-blue-900 font-medium" : ""}`}
                                            >
                                                Created at
                                            </button>
                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        tasksAction.setSort(
                                                            "dueDate",
                                                        ),
                                                    )
                                                }
                                                className={`border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-white ${sortBy === "dueDate" ? "bg-blue-50 dark:bg-blue-900 font-medium" : ""}`}
                                            >
                                                Due date
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        id="filter"
                                        className="flex flex-col text-center px-4 py-1"
                                    >
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1A6] border-b border-[#E8E8ED] dark:border-gray-700 pb-1 mb-2">
                                            Filter
                                        </div>
                                        <div className="flex flex-col gap-2 mt-2">
                                            <div
                                                className="relative"
                                                onMouseEnter={() =>
                                                    setIsCategoryDropdownOpen(
                                                        true,
                                                    )
                                                }
                                                onMouseLeave={() =>
                                                    setIsCategoryDropdownOpen(
                                                        false,
                                                    )
                                                }
                                            >
                                                <button
                                                    className={`border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-white ${filter.category !== "all" ? "bg-blue-50 dark:bg-blue-900 font-medium" : ""}`}
                                                >
                                                    Category
                                                </button>
                                                {isCategoryDropdownOpen && (
                                                    <RelativeModal
                                                        texts={categories}
                                                        selectedValue={
                                                            selectedCategory
                                                        }
                                                        onClick={(text) =>
                                                            dispatch(
                                                                tasksAction.setFilter(
                                                                    {
                                                                        category:
                                                                            text ===
                                                                            "All"
                                                                                ? "all"
                                                                                : text,
                                                                    },
                                                                ),
                                                            )
                                                        }
                                                    />
                                                )}
                                            </div>
                                            <div
                                                className="relative"
                                                onMouseEnter={() =>
                                                    setIsPriorityDropdownOpen(
                                                        true,
                                                    )
                                                }
                                                onMouseLeave={() =>
                                                    setIsPriorityDropdownOpen(
                                                        false,
                                                    )
                                                }
                                            >
                                                <button
                                                    className={`border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-white ${filter.priority !== "all" ? "bg-blue-50 dark:bg-blue-900 font-medium" : ""}`}
                                                >
                                                    Prority
                                                </button>
                                                {isPriorityDropdownOpen && (
                                                    <RelativeModal
                                                        texts={priorities}
                                                        selectedValue={
                                                            selectedPriority
                                                        }
                                                        onClick={(text) =>
                                                            dispatch(
                                                                tasksAction.setFilter(
                                                                    {
                                                                        priority:
                                                                            text ===
                                                                            "All"
                                                                                ? "all"
                                                                                : text,
                                                                    },
                                                                ),
                                                            )
                                                        }
                                                    />
                                                )}
                                            </div>
                                            <button
                                                onClick={() =>
                                                    setIsDateRangeModalOpen(
                                                        true,
                                                    )
                                                }
                                                className={`border text-sm border-gray-200 dark:border-gray-600 rounded-md px-1 py-1 hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-white transition-colors ${filter.startDate || filter.endDate ? "bg-blue-50 dark:bg-blue-900 font-medium" : ""}`}
                                            >
                                                Date range
                                            </button>
                                            <Modal
                                                isOpen={isDateRangeModalOpen}
                                                onClose={() =>
                                                    setIsDateRangeModalOpen(
                                                        false,
                                                    )
                                                }
                                            >
                                                <DateRangeForm
                                                    onClose={() =>
                                                        setIsDateRangeModalOpen(
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
                    <div className="relative" ref={viewRef}>
                        <Button
                            style="px-4 py-1"
                            text="View"
                            onClick={() => {
                                if (isFilterDropdownOpen) {
                                    setIsFilterDropdownOpen(false);
                                }
                                setIsViewDropdownOpen(!isViewDropdownOpen);
                            }}
                        />

                        {isViewDropdownOpen && !isFilterDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 backd">
                                <button
                                    onClick={() => {
                                        onViewChange("kanban");
                                        setIsViewDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-t-xl transition-colors ${currentView === "kanban" ? "bg-blue-50 dark:bg-blue-900 font-medium dark:text-white" : "text-gray-700 dark:text-gray-300"}`}
                                >
                                    Group
                                </button>
                                <button
                                    onClick={() => {
                                        onViewChange("list");
                                        setIsViewDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-b-xl transition-colors ${currentView === "list" ? "bg-blue-50 dark:bg-blue-900 font-medium dark:text-white" : "text-gray-700 dark:text-gray-300"}`}
                                >
                                    List
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
