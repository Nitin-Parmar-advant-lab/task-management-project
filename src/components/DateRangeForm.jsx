import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useDispatch, useSelector } from "react-redux";
import { tasksAction } from "../store/taskSlice";

export default function DateRangeForm({ onClose }) {
    const dispatch = useDispatch();
    const currentFilter = useSelector((state) => state.filter);

    const [range, setRange] = useState({
        from: currentFilter.startDate
            ? new Date(currentFilter.startDate)
            : undefined,
        to: currentFilter.endDate ? new Date(currentFilter.endDate) : undefined,
    });

    const [error, setError] = useState("");

    function handleApply() {
        if (!range?.from || !range?.to) {
            setError("Please select both start and end dates to filter.");
            return;
        }

        setError("");

        dispatch(
            tasksAction.setFilter({
                startDate: range.from.toISOString(),
                endDate: range.to.toISOString(),
            }),
        );

        onClose();
    }

    function handleReset() {
        setRange({ from: undefined, to: undefined });
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
            className="flex flex-col items-center gap-4 p-4 min-w-[350px]"
        >
            <h3 className="text-xl font-medium text-gray-800 ml-2 mb-2">
                Filter Tasks by Date
            </h3>

            <div className="border border-gray-200 rounded-2xl p-2 bg-white">
                <DayPicker
                    mode="range"
                    selected={range}
                    onSelect={(newRange) => {
                        setRange(newRange);
                        if (newRange?.from && newRange?.to) setError("");
                    }}
                    className="m-0"
                />
            </div>

            {error && (
                <p className="text-sm font-medium">
                    {error}
                </p>
            )}

            <div className="flex flex-wrap justify-between w-full gap-3 mt-4">
                <button
                    onClick={onClose}
                    className="flex-1 py-2.5 px-4 border border-gray-300 rounded-xl font-medium text-gray-600 cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    onClick={handleReset}
                    className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium cursor-pointer"
                >
                    Reset
                </button>
                <button
                    onClick={handleApply}
                    className="flex-2 py-2.5 px-4 bg-amber-400 text-white rounded-xl font-medium cursor-pointer"
                >
                    Apply Filter
                </button>
            </div>
        </div>
    );
}
