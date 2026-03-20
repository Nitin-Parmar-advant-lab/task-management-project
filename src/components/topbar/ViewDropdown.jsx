import { useState } from "react";
import Button from "../ui/Button";
import { useClickOutside } from "../../hooks/useClickOutside";

export default function ViewDropdown({ currentView, onViewChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useClickOutside(() => setIsOpen(false));

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                style="px-4 py-1 shadow-sm/10"
                text="View"
                onClick={() => setIsOpen((prev) => !prev)}
            />

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[#FFFFFF] dark:bg-[#1D1D1F] border border-[#E8E8ED] dark:border-[#2D2D2F] rounded-2xl shadow-2xl z-50 overflow-hidden scale-in-center">
                    <button
                        onClick={() => {
                            onViewChange("kanban");
                            setIsOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 transition-all ${currentView === "kanban" ? "bg-[#F2F7FF] text-[#0066CC] font-semibold dark:bg-[#2997FF]/10 dark:text-[#2997FF]" : "text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#2D2D2F]"}`}
                    >
                        Group
                    </button>
                    <button
                        onClick={() => {
                            onViewChange("list");
                            setIsOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 transition-all ${currentView === "list" ? "bg-[#F2F7FF] text-[#0066CC] font-semibold dark:bg-[#2997FF]/10 dark:text-[#2997FF]" : "text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-[#F5F5F7] dark:hover:bg-[#2D2D2F]"}`}
                    >
                        List
                    </button>
                </div>
            )}
        </div>
    );
}