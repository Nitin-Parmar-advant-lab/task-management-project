import highPriority from "../../../../public/high-priority.svg";

export default function TaskCard() {
    return (
        <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-sm hover:shadow-md flex flex-col justify-between">
            <h3 className="font-normal text-lg">Task Title</h3>

            <p className="text-sm text-gray-600 mt-1">
                Short description of the task goes here.
            </p>

            <div className="flex justify-between items-center mt-5 text-sm ">
                <img src={highPriority} alt="Priority" className="w-4" />
                <span className="text-gray-500 ">Due: 12 Apr</span>
            </div>
        </div>
    );
}
