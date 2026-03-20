import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tasksAction } from "../../store/taskSlice";

export default function SearchInput() {
    const dispatch = useDispatch();
    const initialSearch = useSelector((state) => state.tasks.search);
    const [searchTerm, setSearchTerm] = useState(initialSearch);

    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch(tasksAction.setSearch(searchTerm));
        }, 500);

        return () => clearTimeout(handler);
    }, [searchTerm, dispatch]);

    return (
        <input
            type="text"
            placeholder="Search title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="lg:ml-10 mr-4 px-3 border border-[#E8E8ED] rounded-xl h-8.5 w-full outline-none bg-[#f1f1f575] text-[#1D1D1F] dark:bg-[#131314] dark:text-[#F5F5F7] dark:border-[#2D2D2F] shadow-sm backdrop-blur-md"
        />
    );
}
