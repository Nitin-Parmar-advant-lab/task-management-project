import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";
import { uiActions } from "../../store/uiSlice";
import logoutIcon from "../../assets/logout.svg";

export default function SidebarFooter() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isDarkMode = useSelector((state) => state.ui.isDarkMode);
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(authActions.logout());
        navigate("/login");
    };

    return (
        <div
            id="Footer"
            className="border-t border-[#E8E8ED] dark:border-[#2D2D2F] text-center p-2 space-y-1"
        >
            <button
                onClick={() => dispatch(uiActions.toggleDarkMode())}
                className="w-full p-2.5 rounded-lg cursor-pointer flex items-center justify-center gap-2 hover:bg-[#F5F5F7] dark:hover:bg-[#1D1D1F] transition-all text-[#1D1D1F] dark:text-[#F5F5F7] font-medium text-sm"
            >
                <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>

            <div className="flex items-center justify-center border-t border-[#E8E8ED] dark:border-[#2D2D2F] p-1">
                {user && (
                    <div className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium text-sm px-2 pb-1 truncate cursor-default">
                        {user.name || user.email}
                    </div>
                )}
                <img
                    src={logoutIcon}
                    alt="logout"
                    onClick={handleLogout}
                    className="w-8 p-2 dark:invert cursor-pointer hover:bg-red-500/50 rounded-lg dark:hover:bg-[#04d3c9]/40 transition-all text-sm"
                ></img>
            </div>
        </div>
    );
}
