import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { authActions } from "../store/authSlice";
import { USER } from "../USER";

export default function LoginPage() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        error: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value,
            error: "", 
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (
            loginData.email === USER.email &&
            loginData.password === USER.password
        ) {
            const userId = crypto.randomUUID();
            dispatch(authActions.login({ email: loginData.email, id: userId }));
            navigate("/");
        } else {
            let errorMessage = "";
            if (loginData.email !== USER.email) {
                errorMessage = "Invalid email address.";
            } else if (loginData.password !== USER.password) {
                errorMessage = "Invalid password.";
            }
            setLoginData((prev) => ({ ...prev, error: errorMessage }));
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#e8e8ed] dark:bg-[#161617] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-sm w-full space-y-8 p-8 bg-[#f5f5f7] dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div>
                    <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
                        Sign in
                    </h2>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        <div>
                            <input
                                type="email"
                                name="email"
                                required
                                value={loginData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                required
                                value={loginData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <div>
                        {loginData.error && (
                            <div className=" text-red-600 text-sm ">
                                {loginData.error}
                            </div>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-[#1d1d1f] hover:bg-[#2d2d2f] cursor-pointer"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
