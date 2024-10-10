import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://students-hackaton.vercel.app/user/sign-up',
        formData
      );

      console.log('User registered successfully:', response.data);

      navigate('/');

    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Error occurred while registering');
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        setError('No response from the server. Please try again later.');
        console.error('Error request:', error.request);
      } else {
        setError('Something went wrong. Please try again.');
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-2/5 bg-gray-900 text-white p-12 items-center">
        <img src="/cart.webp" alt="Logo" className="mb-8 w-32 rounded-full" />
        <h1 className="text-4xl mt-9 font-bold leading-tight">Welcome to Our Blog!</h1>
        <p className="mt-6 text-xl">
          Be the first to explore trending topics and gain knowledge that can transform your perspective—sign up now and start your journey with us!
        </p>
        <div className="bg-gray-700 p-24 rounded-lg shadow-md mt-12">
          <p className="font-semibold text-2xl">Stay Informed, Stay Inspired!</p>
          <p className="mt-2 text-xl">
            Unlock exclusive insights, expert tips, and inspiring stories tailored just for you. Join our community by signing up today and never miss out on the latest blog posts that spark creativity and fuel your passion!
          </p>
          <div>
            <p className="font-semibold">Catherine Johns</p>
            <div className="text-yellow-400 text-xl">★★★★★</div>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-white flex items-center justify-center ml-24">
        <div className="w-full max-w-lg">
          <h2 className="text-4xl font-bold mb-16">Let's get started</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-start text-lg mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded"
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="block text-start text-lg mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-start text-lg mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded"
                placeholder="name@example.com"
              />
            </div>

            <div className="mb-10">
              <label className="block text-start text-lg mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded"
                placeholder="Password"
              />
            </div>

            {error && (
              <div className="text-red-600 mb-4">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-700 transition"
            >
              Get Started
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;





