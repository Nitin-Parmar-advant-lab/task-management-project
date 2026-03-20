import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";
import { uiActions } from "../../store/uiSlice";

export default function SidebarFooter() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isDarkMode = useSelector((state) => state.ui.isDarkMode);

    const handleLogout = () => {
        dispatch(authActions.logout());
        navigate("/login");
    };

    return (
        <div id="Footer" className="border-t border-[#E8E8ED] dark:border-[#2D2D2F] text-center p-2 space-y-1">
            <button
                onClick={() => dispatch(uiActions.toggleDarkMode())}
                className="w-full p-2.5 rounded-lg cursor-pointer flex items-center justify-center gap-2 hover:bg-[#F5F5F7] dark:hover:bg-[#1D1D1F] transition-all text-[#1D1D1F] dark:text-[#F5F5F7] font-medium text-sm"
            >
                <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>

            <button
                onClick={handleLogout}
                className="w-full p-2.5 text-[#D70015] dark:text-[#FF453A] font-medium cursor-pointer hover:bg-[#D70015]/10 dark:hover:bg-[#FF453A]/10 rounded-lg transition-all text-sm"
            >
                Logout
            </button>
        </div>
    );
}