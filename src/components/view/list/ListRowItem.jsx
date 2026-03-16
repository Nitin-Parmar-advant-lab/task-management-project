export default function ListRowItem({ title, description, priority, dueDate }) {
    return (
        <div className="grid grid-cols-[1fr_4fr_.5fr_.2fr] border p-3 rounded hover:bg-gray-50">
            <div className="line-clamp-1">{title}</div>
            <div className="line-clamp-1">{description}</div>
            <div>{dueDate}</div>
            <div>{priority}</div>
        </div>
    );
}
