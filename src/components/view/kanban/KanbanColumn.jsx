import TaskCard from "./TaskCard";

export default function KanbanCol({ title }) {
    return (
        <div className="bg-gray-500 rounded-xl p-4 h-full flex flex-col">
            {/* Column Title */}
            <p className="text-lg font-normal mb-4 text-center">{title}</p>

            {/* Cards */}
            <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
                <TaskCard />
                <TaskCard />
                <TaskCard />
                <TaskCard />
                <TaskCard />
                <TaskCard />
            </div>
        </div>
    );
}
