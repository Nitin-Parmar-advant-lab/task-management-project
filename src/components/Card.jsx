export default function Card({ task, columnId }) {
    function handleMouseDown(e) {
        window.startDrag({
            task,
            from: columnId,
            x: e.clientX,
            y: e.clientY,
        });
    }

    return (
        <div
            onMouseDown={handleMouseDown}
            className="text-white bg-[#7e7b75] rounded-lg h-20 p-2 my-2 cursor-grab active:cursor-grabbing select-none"
        >
            <h1>{task}</h1>
        </div>
    );
}