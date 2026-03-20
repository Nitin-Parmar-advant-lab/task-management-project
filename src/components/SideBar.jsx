import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlice";
import ProjectList from "./sidebar/ProjectList";
import SidebarFooter from "./sidebar/SidebarFooter";
import closeToggleIcon from "../assets/close-taggle-icon.svg";

export default function SideBar({ onAddProject }) {
    const dispatch = useDispatch();
    const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);

    return (
        <>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => dispatch(uiActions.closeSidebar())}
                />
            )}

            <div
                id="sidebar"
                className={`fixed inset-y-0 left-0 z-50 w-64 h-full border-r border-[#E8E8ED] dark:border-[#2D2D2F] flex flex-col bg-[#FFFFFF] dark:bg-[#161617] transition-transform duration-300 transform lg:relative lg:translate-x-0 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`} 
            >
                <div
                    id="Logo"
                    className="border-b border-[#E8E8ED] dark:border-[#2D2D2F] p-4 flex items-center justify-between"
                >
                    <div className="flex-1 text-center pl-8 lg:pl-0">
                        <p className="text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                            TM
                        </p>
                    </div>
                    <button
                        onClick={() => dispatch(uiActions.closeSidebar())}
                        className="lg:hidden p-2 hover:bg-[#F5F5F7] dark:hover:bg-[#1D1D1F] rounded-xl transition-colors"
                    >
                        <img
                            src={closeToggleIcon}
                            alt="close sidebar"
                            className="w-5 h-5 opacity-70"
                        />
                    </button>
                </div>

                <div
                    id="Create-Project"
                    className="border-b border-[#E8E8ED] dark:border-[#2D2D2F] p-4 text-center"
                >
                    <button
                        onClick={onAddProject}
                        className="w-full py-2 bg-[#0066CC] dark:bg-[#2997FF] text-white font-medium rounded-lg hover:bg-[#0071E3] dark:hover:bg-[#5AC8FA] transition-colors duration-300 shadow-sm"
                    >
                        Create Project
                    </button>
                </div>

                <ProjectList />

                <SidebarFooter />
            </div>
        </>
    );
}
