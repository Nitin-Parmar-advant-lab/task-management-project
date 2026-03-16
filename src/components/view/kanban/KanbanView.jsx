import KanbanColumn from "./KanbanColumn";

export default function KanbanView() {
    return (
        <div
            id="kanban-view"
            className="flex gap-6 px-5 h-full overflow-x-auto p-2"
        >
            <div id="todo-task" className="flex-1 min-w-75">
                <KanbanColumn title="Todo" />
            </div>

            <div id="in-progress-task" className="flex-1 min-w-75">
                <KanbanColumn title="In Progress" />
            </div>

            <div id="completed-task" className="flex-1 min-w-75">
                <KanbanColumn title="Completed" />
            </div>
        </div>
    );
}
