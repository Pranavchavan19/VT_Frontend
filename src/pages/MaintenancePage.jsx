

import React from "react";

function MaintenancePage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-tl from-black via-gray-900 to-gray-800">
            <div className="text-center px-6 py-8 sm:px-10 sm:py-12 bg-gray-900 rounded-3xl shadow-2xl w-full sm:w-[500px] md:w-[600px] lg:w-[650px] border border-gray-700">

                <h1 className="text-4xl sm:text-4.9xl font-bold text-orange-400 mb-6">
                    🚧 Maintenance Mode 🚧
                </h1>
                <p className="text-sm sm:text-base text-gray-300 mb-8 leading-relaxed">
                    We're currently performing scheduled maintenance to improve your experience. 
                    Thank you for your patience. Please check back soon!
                </p>
                <div className="flex justify-center mb-8">
                    <a
                        href="/"
                        className="text-sm sm:text-base text-white bg-gradient-to-r from-orange-500 to-pink-500 px-6 sm:px-8 py-3 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-2xl focus:ring-4 focus:ring-orange-600"
                    >
                        Return to Home
                    </a>
                </div>
                <div className="relative">
                    <img
                        src="https://img.freepik.com/premium-vector/mobile-device-repair-trending-concept-flat-illustration_720185-2664.jpg?ga=GA1.1.445864076.1734670647&semt=ais_hybrid"
                        alt="Under Maintenance"
                        className="mx-auto rounded-xl shadow-lg transition-transform duration-300 h-auto sm:h-[250px] md:h-[300px] lg:h-[350px] w-full sm:w-[350px] md:w-[400px] lg:w-[450px]"
                    />
                    {/* <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 text-gray-300 text-xs sm:text-sm py-2 rounded-b-xl">
                        <strong>Estimated Time:</strong> 1 hour 30 minutes
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default MaintenancePage;
