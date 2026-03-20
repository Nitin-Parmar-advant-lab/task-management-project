import { useEffect } from "react";

import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import { useSelector } from "react-redux";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "*",
        element: <Navigate to="/" />,
    },
]);

export default function App() {
    const isDarkMode = useSelector((state) => state.ui.isDarkMode);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}
