import React from "react";
import { Link } from "react-router-dom";
import "./CongratsEditPersonalDetails.css"; 
function CongratsEditPersonalDetails() {
    return (
        <div className="relative flex justify-center items-center h-screen bg-gradient-to-b from-purple-500 via-pink-500 to-red-500 p-4 overflow-hidden">
            
            <div className="absolute inset-0 z-0">
                {Array.from({ length: 80 }).map((_, i) => (
                    <div
                        key={i}
                        className="flying-chit"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                            transform: `rotate(${Math.random() * 360}deg)`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${Math.random() * 5 + 3}s`,
                        }}
                    ></div>
                ))}
            </div>

           
            <div className="relative z-10 bg-gradient-to-br from-yellow-500 via-yellow-600 to-black p-8 rounded-2xl shadow-lg max-w-md w-full text-center transform transition-all hover:scale-105">
    
    <div className="mb-6">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 mx-auto text-black animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m-6 6a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    </div>

  
    <h1 className="text-[26px] sm:text-[40px]  font-extrabold text-green-950 mb-4">
    Congratulations!
    </h1>


    
    <p className="text-white text-lg mb-6">
    Your personal details have been successfully updated.
    </p>

 
    <Link
        to="/login"
        className="inline-block bg-yellow-600 text-black px-6 py-3 rounded-full text-lg font-bold shadow-md hover:bg-yellow-500 hover:text-green-900 transform hover:scale-105 transition-transform"
    >
        Go to Login
    </Link>
</div>

        </div>
    );
}

export default CongratsEditPersonalDetails;

