import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();

  const logout = () => {
    setCookies("token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth/login");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between align-center">
          <Link to="/" className="text-white font-bold text-xl">
            My Recipe Book
          </Link>
          <div className="flex space-x-4">
            {!cookies.token ? (
              <Link
                to="/auth/login"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Login/Register
              </Link>
            ) : (
              <>
                <Link
                  to="/create-recipe"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Create Recipe
                </Link>
                <Link
                  to="/saved-recipes"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Saved Recipes
                </Link>
                <button
                  onClick={logout}
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
