import { useState } from "react";
import Button from "./ui/Button";

export default function TopBar({
    setCreateTaskModal,
    currentView,
    onViewChange,
    projectTitle,
}) {
    const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);

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
                    placeholder="Search"
                    className="mx-10 px-5 border border-gray-400 rounded-md h-8 w-xl defaul"
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

                <div className="helper flex items-center gap-3 relative">
                    <Button style="px-4 py-1" text="Filter" />

                    <div className="relative">
                        <Button
                            style="px-4 py-1"
                            text="View"
                            onClick={() =>
                                setIsViewDropdownOpen(!isViewDropdownOpen)
                            }
                        />

                        {isViewDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-50 ">
                                <button
                                    onClick={() => {
                                        onViewChange("kanban");
                                        setIsViewDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 hover:bg-amber-50 transition-colors ${currentView === "kanban" ? "bg-amber-50 font-medium" : "text-gray-700"}`}
                                >
                                    Group
                                </button>
                                <button
                                    onClick={() => {
                                        onViewChange("list");
                                        setIsViewDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 hover:bg-amber-50 transition-colors ${currentView === "list" ? "bg-amber-50  font-medium" : "text-gray-700"}`}
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
