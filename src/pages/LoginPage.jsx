import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { authActions } from "../store/authSlice";
import { USER } from "../USER";

export default function LoginPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isVerified = useSelector((state) => state.auth.isVerified);

    if (isVerified) {
        return <Navigate to="/" />;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) setError("");
    };

    const validateUser = ({ email, password }) => {
        // const user = USER.find((u) => u.email === email);

        // if (!user) return "Invalid email address.";
        // if (user.password !== password) return "Invalid password.";

        // return null;

        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        const allUsers = [...USER, ...registeredUsers];
        const user = allUsers.find((u) => u.email === email);

        if (!user)
            return { error: "Invalid email address.", validatedUser: null };
        if (user.password !== password)
            return { error: "Invalid password.", validatedUser: null };
        return { error: null, validatedUser: user };
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { error: validationError, validatedUser } = validateUser(form);

        if (validationError) {
            setError(validationError);
            return;
        }

        dispatch(
            authActions.login({
                email: validatedUser.email,
                id: validatedUser.id || crypto.randomUUID(),
                name: validatedUser.name,
            }),
        );

        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] dark:bg-[#000000] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
            <div className="max-w-md w-full space-y-6 p-8 bg-[#FFFFFF] dark:bg-[#161617] rounded-3xl shadow-2xl border border-[#E8E8ED] dark:border-[#2D2D2F]">
                <div>
                    <h2 className="text-center text-3xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] tracking-tight">
                        Sign in
                    </h2>
                </div>

                <div className="text-center text-sm">
                    <p className="text-[#1D1D1F] dark:text-[#F5F5F7] font-medium">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-[#0066CC] dark:text-[#2997FF] font-bold hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="group">
                            <input
                                id="login-email"
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
                                id="login-password"
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
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
