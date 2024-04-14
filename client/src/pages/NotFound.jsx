import React from "react";
import image404 from "../assets/404.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg mx-auto p-8">
        <img src={image404} alt="404 Not Found" className="w-full" />
        <div className="text-center mt-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            The page you are looking for might have been removed or is
            temporarily unavailable.
          </p>
          <Link to="/" className="text-blue-500 hover:underline block mt-8">
            Go back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
