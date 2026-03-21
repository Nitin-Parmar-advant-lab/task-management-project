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
    const isVerified = useSelector((state) => state.auth.isVerified);

    if (isVerified) {
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
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] dark:bg-[#000000] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
            <div className="max-w-md w-full space-y-8 p-8 bg-[#FFFFFF] dark:bg-[#161617] rounded-3xl shadow-2xl border border-[#E8E8ED] dark:border-[#2D2D2F]">
                <div>
                    <h2 className="text-center text-3xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                        Sign in
                    </h2>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="group">
                            <input
                                type="email"
                                name="email"
                                required
                                value={loginData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-[#E8E8ED] dark:border-[#2D2D2F] placeholder-[#A1A1A6] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-xl outline-none focus:ring-2 focus:ring-[#0066CC]/20 transition-all font-medium"
                                placeholder="Email address"
                            />
                        </div>
                        <div className="group">
                            <input
                                type="password"
                                name="password"
                                required
                                value={loginData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-[#E8E8ED] dark:border-[#2D2D2F] placeholder-[#A1A1A6] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-xl outline-none focus:ring-2 focus:ring-[#0066CC]/20 transition-all font-medium"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {loginData.error && (
                        <div className="text-[#D70015] dark:text-[#FF453A] text-xs font-bold uppercase tracking-wide text-center">
                            {loginData.error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 text-sm font-bold rounded-xl text-white bg-[#0066CC] hover:bg-[#0071E3] dark:bg-[#2997FF] dark:hover:bg-[#5AC8FA] transition-all shadow-lg cursor-pointer"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
