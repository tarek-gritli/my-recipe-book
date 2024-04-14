import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "../components/Form";
import { useToast } from "@chakra-ui/react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    if (username.trim().length < 5 || username.trim().length > 32) {
      newErrors.username = "Username must be 5-32 characters long";
    }
    if (password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    setErrors(newErrors);
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        username,
        password,
      });
      toast({
        title: "Account created.",
        description: "Your account has been successfully created.",
        status: "success",
        position: "top-left",
        isClosable: true,
      });
      navigate("/auth/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast({
          title: "An Error Occurred.",
          description: "Please verify your credentials!",
          status: "error",
          position: "top-left",
          isClosable: true,
        });
      }
      else {
        toast({
          title: "An Error Occurred.",
          description: "An  unexpected error occurred on the server",
          status: "error",
          position: "top-left",
          isClosable: true
        })
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up
          </h2>
          <div className="mt-4 text-center">
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
        </div>
        <Form
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
          handleSubmit={handleSubmit}
          page="signup"
          errors={errors}
        />
      </div>
    </div>
  );
};

export default Signup;
