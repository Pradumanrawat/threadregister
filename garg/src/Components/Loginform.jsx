
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
const Loginform = () => {
  const [companyName, setCompanyName] = useState("")
  const [password, setpassword] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = {
        companyName,
        password
      }
      const response = await axios.post("http://localhost:7000/login", formdata);
      localStorage.setItem("token", response.data.token); // Store JWT

      toast.success(response.data.message)
      setCompanyName('')
      setpassword('')
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response?.data?.error || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <ToastContainer position='bottom-center' autoClose={3000} hideProgressBar={false} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="  block text-sm font-medium text-gray-700 px-4">
              Company Name:
            </label>
            <input
              type="text"
              name="companyName"

              placeholder="Enter your company name"
              value={companyName}
              onChange={(e) => { setCompanyName(e.target.value) }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 px-4">
              Password:
            </label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => { setpassword(e.target.value) }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"

          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Loginform;
