import ListRow from "./ListRow";

export default function ListView() {
    return (
        <div className="w-full pb-4 px-4 ">
            <div
                className="pl-5 grid grid-cols-[1fr_4fr_.5fr_.2fr] text-sm font-semibold border-b px-3 py-3 
                sticky top-0 bg-white z-30"
            >
                <div>Title</div>
                <div>Description</div>
                <div>Due Date</div>
                <div>Priority</div>
            </div>

            <div id="listview" className="flex flex-col gap-6">
                <ListRow id="todo-task" title="In Progress" count={1} />

                <ListRow id="in-progress-task" title="To Do" count={1} />

                <ListRow id="completed-task" title="Completed" count={1} />
            </div>
        </div>
    );
}
