import TaskCard from "./TaskCard";

export default function KanbanCol({ title, tasks, onCardClick }) {
    return (
        <div className="bg-gray-200 rounded-xl p-4 h-full flex flex-col">
            <p className="text-lg font-normal mb-4 text-center">
                {title}
                <span>({tasks.length})</span>
            </p>

            <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
                {tasks.length === 0 && (
                    <div className="text-gray-400 text-sm text-center py-20">
                        No tasks yet
                    </div>
                )}
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onCardClick={onCardClick}
                    />
                ))}
            </div>
        </div>
    );
}
