import React from "react";

function MaintenancePage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-tl from-black via-gray-900 to-gray-800">
            <div className="text-center px-4 py-5 sm:px-6 sm:py-8 bg-gray-900 rounded-2xl shadow-lg w-full max-w-[360px] sm:max-w-[410px] border border-gray-700">
                <h1 className="text-2xl sm:text-3xl font-bold text-orange-400 mb-4">
                    🚧 Maintenance Mode 🚧
                </h1>
                <p className="text-xs sm:text-sm text-gray-300 mb-5 leading-relaxed">
                    We're currently performing scheduled maintenance to improve your experience. 
                    Thank you for your patience. Please check back soon!
                </p>
                <div className="flex justify-center mb-5">
                    <a
                        href="/"
                        className="text-xs sm:text-sm text-white bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-2 rounded-lg shadow-md transform transition hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-orange-600"
                    >
                        Return to Home
                    </a>
                </div>
                <div className="relative">
                    <img
                        src="https://img.freepik.com/premium-vector/mobile-device-repair-trending-concept-flat-illustration_720185-2664.jpg?ga=GA1.1.445864076.1734670647&semt=ais_hybrid"
                        alt="Under Maintenance"
                        className="mx-auto rounded-xl shadow-md transition-transform duration-300 h-auto max-h-[150px] sm:max-h-[200px] w-full max-w-[250px]"
                    />
                </div>
            </div>
        </div>
    );
}

export default MaintenancePage;
