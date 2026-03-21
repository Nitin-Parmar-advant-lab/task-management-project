import { useState, useEffect } from "react";
import Columns from "./Columns";

const initialData = {
    Todo: ["Task 1", "Task 2", "Task 3"],
    Progress: ["Task 4", "Task 5"],
    Done: ["Task 6"],
};

export default function Section() {
    const [columns, setColumns] = useState(initialData);

    const [dragging, setDragging] = useState(null);

    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        window.startDrag = (data) => {
            setDragging(data);
            setPosition({ x: data.x, y: data.y });
        };

        function handleMove(e) {
            if (!dragging) return;

            setPosition({
                x: e.clientX,
                y: e.clientY,
            });
        }

        function handleUp(e) {
            if (!dragging) return;

            const el = document.elementFromPoint(e.clientX, e.clientY);
            const columnEl = el?.closest("[data-column]");

            if (columnEl) {
                const toColumn = columnEl.dataset.column;

                setColumns((prev) => {
                    const newState = { ...prev };

                    newState[dragging.from] = newState[dragging.from].filter(
                        (t) => t !== dragging.task,
                    );

                    newState[toColumn] = [...newState[toColumn], dragging.task];

                    return newState;
                });
            }

            setDragging(null);
        }

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleUp);

        return () => {
            delete window.startDrag;
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleUp);
        };
    }, [dragging]);

    return (
        <div className="flex gap-4 p-30 w-full h-screen bg-black overflow-hidden relative">
            {Object.entries(columns).map(([colId, tasks]) => (
                <Columns key={colId} id={colId} tasks={tasks} />
            ))}

            {dragging && (
                <div
                    style={{
                        position: "fixed",
                        top: position.y - 40,
                        left: position.x - 100,
                        pointerEvents: "none",
                        zIndex: 1000,
                        width: "200px",
                    }}
                    className="text-white bg-[#7e7b75] rounded-lg h-20 p-2 opacity-80 shadow-2xl flex items-center justify-center border-2 border-white/20"
                >
                    <h1>{dragging.task}</h1>
                </div>
            )}
        </div>
    );
}
