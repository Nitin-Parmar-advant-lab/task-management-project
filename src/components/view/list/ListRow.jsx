import ListRowItem from "./ListRowItem";

export default function ListRow({ title, tasks, onCardClick }) {
    return (
        <div>
            <div className="font-bold text-sm text-[#1D1D1F] dark:text-[#F5F5F7] mb-2 pl-5 flex items-center gap-2">
                {title}
                <span className="text-[#86868B] dark:text-[#A1A1A6] font-medium text-xs">
                    ({tasks.length})
                </span>
            </div>

            <div className="flex flex-col gap-2">
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
