import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.email && formData.password) {
      try {
        const response = await axios.post(
          "https://students-hackaton.vercel.app/user/sign-in",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        const token = response.data.token;

        if (token) {
          localStorage.setItem("token", token);
          navigate("/");
        } else {
          setError("Invalid login credentials");
        }
      } catch (err) {
        setError("Failed to login. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-800">
      <div className="flex bg-white rounded-xl shadow-lg w-full max-w-7xl h-auto">
        <div className="hidden md:block w-1/2 bg-gray-100">
          <img
            src="/cart.webp"
            alt="img"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 bg-white">
          <div className="text-center">
            <img
              src="/cart.webp"
              alt="Logo"
              className="mx-auto h-24 object-cover mb-6"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome back!
            </h2>
            <p className="text-gray-500 mb-6">Please enter your details</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-600 text-start ml-20"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-3/4 px-4 py-2 mt-2 text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-gray-600 text-start ml-20"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-3/4 px-4 py-2 mt-2 text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-around mb-6 ">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="form-checkbox text-indigo-500 mt-4"
                />
                <span className="ml-2 text-sm mt-4 text-gray-600">
                  Remember for 30 days
                </span>
              </label>
              <a
                href="#"
                className="text-sm mt-4 text-indigo-500 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-3/4 bg-gray-900 mt-2 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;