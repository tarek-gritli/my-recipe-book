import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Form from "../components/Form";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [_, setCookies] = useCookies(["token"]);

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = "Username field is required";
    }
    if (!password.trim()) {
      newErrors.password = "Password field is required";
    }
    setErrors(newErrors);
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });
      setCookies("token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      toast({
        title: "Login Successful!",
        description: "You have successfully logged in.",
        status: "success",
        position: "top-left",
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      if (username && password) {
        if (error.response && error.response.status === 404) {
          toast({
            title: "User not found!",
            status: "error",
            position: "top-left",
            isClosable: true,
          });
        } else if (error.response && error.response.status === 401) {
          toast({
            title: "Invalid credentials!",
            status: "error",
            position: "top-left",
            isClosable: true,
          });
        } else {
          toast({
            title: "An Error Occurred.",
            description: "An  unexpected error occurred on the server",
            status: "error",
            position: "top-left",
            isClosable: true,
          });
        }
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-indigo-600">
              Sign up
            </Link>
          </p>
        </div>
        <div className="text-center">
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <Form
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default Login;
