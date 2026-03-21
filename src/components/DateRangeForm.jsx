import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksAction } from "../store/taskSlice";
import closeIcon from "../assets/close-taggle-icon.svg"

const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
};

export default function DateRangeForm({ onClose }) {
    const dispatch = useDispatch();
    const currentFilter = useSelector((state) => state.tasks.filter);

    const [range, setRange] = useState({
        from: formatDateForInput(currentFilter?.startDate),
        to: formatDateForInput(currentFilter?.endDate),
    });

    const [error, setError] = useState("");

    function handleApply() {
        if (!range.from || !range.to) {
            setError("Please select both start and end dates to filter.");
            return;
        }

        if (new Date(range.from) > new Date(range.to)) {
            setError("Start date cannot be after the end date.");
            return;
        }

        setError("");

        dispatch(
            tasksAction.setFilter({
                startDate: new Date(range.from).toISOString(),
                endDate: new Date(`${range.to}T23:59:59.999Z`).toISOString(),
            }),
        );

        onClose();
    }

    function handleReset() {
        setRange({ from: "", to: "" });
        dispatch(
            tasksAction.setFilter({
                startDate: null,
                endDate: null,
            }),
        );
        onClose();
    }

    return (
        <div
            id="date-range-form"
            className="flex flex-col items-center gap-2 p-1 min-w-87 relative"
        >
            <h3 className="text-xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2 tracking-tight">
                Filter by Date
            </h3>

            <img src={closeIcon} alt="close" onClick={onClose} className="absolute w-5 -top-2 -right-2 cursor-pointer dark:invert"/>

            <div className="flex w-full gap-4">
                <div className="flex-1 flex flex-col gap-1.5 text-center">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#86868B] dark:text-[#A1A1A6]">Start</label>
                    <input
                        type="date"
                        value={range.from}
                        onChange={(e) => {
                            setRange((prev) => ({ ...prev, from: e.target.value }));
                            if (e.target.value && range.to) setError("");
                        }}
                        className="bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-[#E8E8ED] dark:border-[#2D2D2F] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-xl p-2 outline-none focus:ring-2 focus:ring-[#0066CC] transition-all font-medium text-sm"
                    />
                </div>

                <div className="flex-1 flex flex-col gap-1.5 text-center">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#86868B] dark:text-[#A1A1A6]">End</label>
                    <input
                        type="date"
                        value={range.to}
                        min={range.from} 
                        onChange={(e) => {
                            setRange((prev) => ({ ...prev, to: e.target.value }));
                            if (range.from && e.target.value) setError("");
                        }}
                        className="bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-[#E8E8ED] dark:border-[#2D2D2F] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-xl p-2 outline-none focus:ring-2 focus:ring-[#0066CC] transition-all font-medium text-sm "
                    />
                </div>
            </div>

            {error && (
                <p className="text-xs font-bold text-[#D70015] dark:text-[#FF453A] mt-2 uppercase tracking-wide">
                    {error}
                </p>
            )}

            <div className="flex flex-row justify-between w-full gap-3 mt-4">
                <button
                    onClick={handleReset}
                    className="flex-1 py-3 px-4 bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-[#E8E8ED] dark:border-[#2D2D2F] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-xl font-bold text-sm tracking-tight cursor-pointer hover:bg-[#E8E8ED] dark:hover:bg-[#2D2D2F] transition-all shadow-sm "
                >
                    Reset
                </button>
                <button
                    onClick={handleApply}
                    className="flex-1 py-3 px-4 bg-[#0066CC] dark:bg-[#2997FF] hover:bg-[#0071E3] dark:hover:bg-[#5AC8FA] text-white rounded-xl font-bold text-sm tracking-tight cursor-pointer transition-all shadow-lg"
                >
                    Apply Filter
                </button>
            </div>
        </div>
    );
}