import ListRowItem from "./ListRowItem";

export default function ListRow({ title, tasks, onCardClick }) {
    return (
        <div>
            <div className="font-semibold text-sm text-gray-700 mb-2 pl-5">
                {title}
                <span>({tasks.length})</span>
            </div>

            <div className="flex flex-col gap-2">
                {tasks.length === 0 && (
                    <div className="text-gray-300 text-[10px] py-8 text-center italic font-medium">
                        No tasks in this section
                    </div>
                )}
                {tasks.map((task) => (
                    <ListRowItem
                        key={task.id}
                        task={task}
                        onCardClick={onCardClick}
                    />
                ))}
            </div>
        </div>
    );
}
