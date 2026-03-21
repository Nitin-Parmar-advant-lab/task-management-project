import Card from "./Card";

export default function Columns({ id, tasks }) {
    return (
        <div
            data-column={id}
            className="border-2 border-white flex-1 h-full bg-gray-900 rounded-lg px-4 py-2 overflow-y-auto"
        >
            {tasks.map((task) => (
                <Card key={task} task={task} columnId={id} />
            ))}
        </div>
    );
}