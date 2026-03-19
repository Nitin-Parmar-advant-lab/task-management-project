import { Link } from "react-router";

export default function LoginModal({ onClose }) {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
                Login Required
            </h2>
            <p className="text-gray-600 mb-6 text-center">
                Please login to interact with the dashboard.
            </p>
            <div className="flex justify-center gap-4">
                <button
                    onClick={onClose}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                    Cancel
                </button>
                <Link
                    to="/login"
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                    Login
                </Link>
            </div>
        </div>
    );
}
