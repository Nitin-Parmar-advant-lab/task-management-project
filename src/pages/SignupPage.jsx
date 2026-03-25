import { useState } from "react";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/authSlice";

export default function SignupPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        const existingUsers =
            JSON.parse(localStorage.getItem("registeredUsers")) || [];

        const emailExists = existingUsers.some((u) => u.email === form.email);
        if (emailExists) {
            setError("Email already exists");
            return;
        }

        const newUser = {
            id: crypto.randomUUID(),
            name: form.name,
            email: form.email,
            password: form.password,
        };

        existingUsers.push(newUser);
        localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

        dispatch(
            authActions.login({
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
            }),
        );
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] dark:bg-[#000000] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
            <div className="max-w-md w-full space-y-8 p-8 bg-[#FFFFFF] dark:bg-[#161617] rounded-3xl shadow-2xl border border-[#E8E8ED] dark:border-[#2D2D2F]">
                <div>
                    <h2 className="text-center text-3xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                        Sign Up
                    </h2>
                </div>

                <div className="text-center text-sm">
                    <p className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-[#0066CC] dark:text-[#2997FF] font-bold hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="group">
                            <input
                                id="signup-name"
                                type="text"
                                name="name"
                                required
                                value={form.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-[#E8E8ED] dark:border-[#2D2D2F] placeholder-[#A1A1A6] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-xl outline-none focus:ring-2 focus:ring-[#0066CC]/20 transition-all font-medium"
                                placeholder="Name"
                            />
                        </div>
                        <div className="group">
                            <input
                                id="signup-email"
                                type="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-[#E8E8ED] dark:border-[#2D2D2F] placeholder-[#A1A1A6] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-xl outline-none focus:ring-2 focus:ring-[#0066CC]/20 transition-all font-medium"
                                placeholder="Email address"
                            />
                        </div>
                        <div className="group">
                            <input
                                id="signup-password"
                                type="password"
                                name="password"
                                required
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-[#F5F5F7] dark:bg-[#1D1D1F] border border-[#E8E8ED] dark:border-[#2D2D2F] placeholder-[#A1A1A6] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-xl outline-none focus:ring-2 focus:ring-[#0066CC]/20 transition-all font-medium"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-[#D70015] dark:text-[#FF453A] text-xs font-bold uppercase tracking-wide text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 text-sm font-bold rounded-xl text-white bg-[#0066CC] hover:bg-[#0071E3] dark:bg-[#2997FF] dark:hover:bg-[#5AC8FA] transition-all shadow-lg cursor-pointer"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
