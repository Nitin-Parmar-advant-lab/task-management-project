
import { useState } from "react";
import Button from "../ui/Button";
import { useClickOutside } from "../../hooks/useClickOutside";
import SortSection from "./SortSection";
import FilterSection from "./FilterSection";

export default function FilterMenu() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);

    const filterRef = useClickOutside(() => setIsFilterOpen(false), isDateModalOpen);

    return (
        <div className="relative" ref={filterRef}>
            <Button
                style="px-4 py-1 shadow-sm/10"
                text="Filter"
                onClick={() => setIsFilterOpen((prev) => !prev)}
            />

            {isFilterOpen && (
                <div className="absolute right-0 mt-2 mr-8 w-64 bg-[#FFFFFF] dark:bg-[#1D1D1F] border border-[#E8E8ED] dark:border-[#2D2D2F] rounded-2xl shadow-2xl z-30 py-1 scale-in-center">
                    <div className="grid grid-cols-2 divide-x-2 divide-[#E8E8ED] dark:divide-[#2D2D2F]">
                        <SortSection />
                        <FilterSection
                            isDateModalOpen={isDateModalOpen}
                            setIsDateModalOpen={setIsDateModalOpen}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}