import { useDispatch } from "react-redux";
import Button from "./ui/Button";
import SearchInput from "./topbar/SearchInput";
import ViewDropdown from "./topbar/ViewDropdown";
import FilterMenu from "./topbar/FilterMenu"; 
import { uiActions } from "../store/uiSlice";
import toggleIcon from "../assets/taggle-icon.svg";

export default function TopBar({
    setCreateTaskModal,
    currentView,
    onViewChange,
    projectTitle,
}) {
    const dispatch = useDispatch();

    return (
        <div id="topbar" className="sticky top-0 z-20 w-full px-4 lg:px-10 pt-4 pb-2 flex flex-col gap-4 lg:gap-6 bg-[#F5F5F7]/80 backdrop-blur-md dark:bg-[#000000]/80 dark:text-[#F5F5F7] transition-colors duration-300">
            
            <div id="search-section" className="w-full border border-[#E8E8ED] dark:border-[#2D2D2F] rounded-2xl min-h-14 h-auto flex flex-wrap lg:flex-nowrap items-center justify-between px-2 bg-[#FFFFFF] dark:bg-[#302f2f] lg:backdrop-blur-md shadow-sm py-2 lg:py-0">
                <div className="flex items-center flex-1 lg:flex-nowrap lg:max-w-2xl">
                    <div className="lg:hidden flex items-center p-2">
                        <button onClick={() => dispatch(uiActions.toggleSidebar())}>
                            <img src={toggleIcon} alt="toggle sidebar" className="w-8 h-8 dark:invert"  />
                        </button>
                    </div>

                    <SearchInput />
                </div>

                <div className="w-full lg:w-auto flex justify-center text-xs lg:justify-end lg:mt-0 pl-4 mt-2">
                    <Button
                        text={`${projectTitle} project`}
                        style="px-4 py-1.5 whitespace-nowrap shadow-sm lg:mr-5 lg:block "
                    />
                </div>
            </div>

            <div id="csfv" className="flex items-center justify-between">
                <Button
                    style="px-5 py-2 shadow-sm"
                    text="Create task"
                    onClick={setCreateTaskModal}
                />

                <div className="helper flex items-center gap-3">

                    <FilterMenu />

                    <ViewDropdown 
                        currentView={currentView} 
                        onViewChange={onViewChange} 
                    />
                </div>
            </div>
        </div>
    );
}