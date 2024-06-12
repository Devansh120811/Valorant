import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authslice.js";
function ForgotPasswordPage() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleOldPasswordToggle = () => {
        setShowOldPassword(!showOldPassword);
    };

    const handleNewPasswordToggle = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            oldpassword: oldPassword,
            newpassword: newPassword,
        };
        if (oldPassword === newPassword) {
            alert("Please enter different password");
            window.location.reload();
        } else {
            try {
                const response = await fetch("http://localhost:5000/forgot-password", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    throw new Error("The password entered is does not match.");
                }
                alert("Password Changed Successfully");
                dispatch(logout());
                navigate("/login");
            } catch (error) {
                alert("Error: ", error);
            }
        }
    };
    return (
        <div className="bg-gray-500 h-screen w-screen flex justify-center m-auto">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full h-screen ">
                <h2 className="text-2xl font-bold mb-2">Forgot Password</h2>
                <p className="text-gray-600 mb-4">
                    Please enter your old password and new password.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="old_password"
                        >
                            Old Password
                        </label>
                        <div className="relative">
                            <input
                                type={showOldPassword ? "text" : "password"}
                                id="old_password"
                                name="old_password"
                                placeholder="Old Password"
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%^&*])[A-Za-z\d!@#\$%^&*]{8,}$"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                                title="This field is required"
                            />
                            <div
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={handleOldPasswordToggle}
                            >
                                {showOldPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15.882 6.118a8 8 0 10-.004 11.764A9.956 9.956 0 0012 18c-1.08 0-2.118-.176-3.108-.498M5 12a7 7 0 1112.874-4.874l3.694 3.694A1 1 0 0120.486 13l-3.722 3.722A7 7 0 115 12z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="new_password"
                        >
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                id="new_password"
                                name="new_password"
                                placeholder="New Password"
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%^&*])[A-Za-z\d!@#\$%^&*]{8,}$"
                                value={newPassword}
                                required
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <div
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={handleNewPasswordToggle}
                            >
                                {showNewPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15.882 6.118a8 8 0 10-.004 11.764A9.956 9.956 0 0012 18c-1.08 0-2.118-.176-3.108-.498M5 12a7 7 0 1112.874-4.874l3.694 3.694A1 1 0 0120.486 13l-3.722 3.722A7 7 0 115 12z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ForgotPasswordPage;