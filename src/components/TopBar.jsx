import { useState, useEffect } from "react";
import Button from "./ui/Button";
import RelativeModal from "./ui/RelativeModal";
import { useDispatch, useSelector } from "react-redux";
import { tasksAction } from "../store/taskSlice";
import Modal from "./ui/Modal";
import DateRangeForm from "./DateRangeForm";

export default function TopBar({
    setCreateTaskModal,
    currentView,
    onViewChange,
    projectTitle,
}) {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filter);
    const sortBy = useSelector((state) => state.sortBy);
    const search = useSelector((state) => state.search);
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

    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch(tasksAction.setSearch(searchTerm));
        }, 500);

        return () => clearTimeout(handler);
    }, [searchTerm, dispatch]);

    const categories = ["All", "Todo", "In Progress", "Completed"];

    const priorities = ["All", "High", "Medium", "Low"];

    return (
        <div
            id="topbar"
            className="sticky top-0 z-50 w-full px-10 pt-4 pb-2 flex flex-col gap-6"
        >
            <div
                id="search-section"
                className="w-full border border-gray-500 rounded-xl h-14 flex items-center justify-between px-2"
            >
                <input
                    type="text"
                    placeholder="Search title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mx-10 px-5 border border-gray-400 rounded-md h-8 w-xl outline-none"
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
                    <div className="relative">
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
                            <div className="absolute right-0 mt-1 mr-8 w-60 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1">
                                <div className="grid grid-cols-2 divide-x-2 divide-gray-200">
                                    <div
                                        id="short-by"
                                        className="flex flex-col text-center px-4 py-1"
                                    >
                                        <div className="font-semibold border-b-2 border-gray-200 pb-1">
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
                                                className={`border border-gray-200 rounded-md px-1 py-1 hover:bg-amber-50 ${sortBy === "createdAt" ? "bg-amber-50 font-medium" : ""}`}
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
                                                className={`border border-gray-200 rounded-md px-2 py-1 hover:bg-amber-50 ${sortBy === "dueDate" ? "bg-amber-50 font-medium" : ""}`}
                                            >
                                                Due date
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        id="filter"
                                        className="flex flex-col text-center px-4 py-1"
                                    >
                                        <div className="font-semibold border-b-2 border-gray-200 pb-1">
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
                                                <button className="border border-gray-200 rounded-md px-2 py-1">
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
                                                <button className="border border-gray-200 rounded-md px-2 py-1">
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
                                                className="border text-sm border-gray-200 rounded-md px-1 py-1"
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
                    <div className="relative">
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
                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-50 ">
                                <button
                                    onClick={() => {
                                        onViewChange("kanban");
                                        setIsViewDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 hover:bg-amber-50 rounded-t-xl transition-colors ${currentView === "kanban" ? "bg-amber-50 font-medium" : "text-gray-700"}`}
                                >
                                    Group
                                </button>
                                <button
                                    onClick={() => {
                                        onViewChange("list");
                                        setIsViewDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 hover:bg-amber-50 rounded-b-xl transition-colors ${currentView === "list" ? "bg-amber-50  font-medium" : "text-gray-700"}`}
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
