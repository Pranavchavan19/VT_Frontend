import React from "react";

function ChangePasswordPage() {
    return (
        <div className="text-white bg-gray-900 p-4 max-w-screen-md mx-auto">
            <h1 className="text-2xl font-bold mb-6">Change Password</h1>
            <form className="bg-gray-800 p-4 rounded-lg space-y-4">
                <div>
                    <label className="block mb-1">Old Password</label>
                    <input
                        type="password"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                    />
                </div>
                <div>
                    <label className="block mb-1">New Password</label>
                    <input
                        type="password"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                    />
                </div>
                <div>
                    <label className="block mb-1">Confirm Password</label>
                    <input
                        type="password"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Update Password
                </button>
            </form>
        </div>
    );
}

export default ChangePasswordPage;
