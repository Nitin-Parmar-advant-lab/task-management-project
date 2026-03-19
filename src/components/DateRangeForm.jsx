import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksAction } from "../store/taskSlice";

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
            className="flex flex-col items-center gap-4 p-2 min-w-87"
        >
            <h3 className="text-xl font-medium text-gray-800 mb-2">
                Filter Tasks by Date
            </h3>

            <div className="flex w-full gap-4">
                <div className="flex-1 flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">Start Date</label>
                    <input
                        type="date"
                        value={range.from}
                        onChange={(e) => {
                            setRange((prev) => ({ ...prev, from: e.target.value }));
                            if (e.target.value && range.to) setError("");
                        }}
                        className="border border-gray-300 rounded-lg p-2"
                    />
                </div>

                <div className="flex-1 flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">End Date</label>
                    <input
                        type="date"
                        value={range.to}
                        min={range.from} 
                        onChange={(e) => {
                            setRange((prev) => ({ ...prev, to: e.target.value }));
                            if (range.from && e.target.value) setError("");
                        }}
                        className="border border-gray-300 rounded-lg p-2"
                    />
                </div>
            </div>

            {error && (
                <p className="text-sm font-medium mt-2">
                    {error}
                </p>
            )}

            <div className="flex flex-wrap justify-between w-full gap-3 mt-4">
                <button
                    onClick={onClose}
                    className="flex-1 py-2.5 px-4 border border-gray-300 hover:bg-gray-50 rounded-xl font-medium text-gray-600 cursor-pointer "
                >
                    Cancel
                </button>
                <button
                    onClick={handleReset}
                    className="flex-1 py-2.5 px-4 bg-gray-100  text-gray-700 rounded-xl font-medium cursor-pointer "
                >
                    Reset
                </button>
                <button
                    onClick={handleApply}
                    className="flex-2 py-2.5 px-4 bg-amber-200 rounded-xl font-medium cursor-pointer"
                >
                    Apply Filter
                </button>
            </div>
        </div>
    );
}