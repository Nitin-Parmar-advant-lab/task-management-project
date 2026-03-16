import ListRowItem from "./ListRowItem";

export default function ListRow({ title, count }) {
    return (
        <div>
            <div className="font-semibold text-sm text-gray-700 mb-2 pl-5">
                {title} ({count})
            </div>

            <div className="flex flex-col gap-2">
                <ListRowItem
                    title="Fix Login BugLogin BugLogin BugLogin BugLogin BugLogin BugLogin BugLogin Bug"
                    description="Fix Login Bug Fix Login BugFix Login BugFix Login BugFix Login Bug"
                    priority="High"
                    dueDate="Mar 20"
                />
                <ListRowItem
                    title="Fix Login Bug"
                    description="Fix Login Bug"
                    priority="High"
                    dueDate="Mar 20"
                />
                <ListRowItem
                    title="Fix Login Bug"
                    description="Fix Login Bug"
                    priority="High"
                    dueDate="Mar 20"
                />
            </div>
        </div>
    );
}
