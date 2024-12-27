import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css"; // Import the CSS file

function Welcome() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6">
      {/* Flying Chits */}
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

      {/* Celebration Card */}
      <div className="relative z-10 bg-gradient-to-br from-green-500 via-blue-600 to-purple-700 p-8 rounded-2xl shadow-lg max-w-md w-full text-center transform transition-all hover:scale-105">
        {/* Icon */}
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-black animate-bounce"
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

        {/* Title */}
        <h1 className="text-[26px] sm:text-[40px] font-extrabold text-green-950 mb-4">
          Congratulations!
        </h1>

        {/* Message */}
        <p className="text-white text-lg mb-6">
          Your account has been successfully created.
        </p>

        {/* Action Button */}
        <Link
          to="/"
          className="inline-block bg-yellow-600 text-black px-6 py-3 rounded-full text-lg font-bold shadow-md hover:bg-yellow-500 hover:text-white transform hover:scale-105 transition-transform"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
