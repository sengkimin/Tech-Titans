import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const View = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`https://students-hackaton.vercel.app/blog/get-blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogData(response.data);
      } catch (err) {
        setError('Failed to fetch blog data');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <img
            src="/cart.webp" 
            alt="Logo"
            className="h-16 w-auto"
          />
          <span className="ml-2 text-2xl font-bold text-gray-900">Tech Titans</span>
        </div>

        <nav className="hidden md:flex space-x-12 text-lg">
          <a href="#" className="text-gray-700 hover:text-blue-700 transition duration-200">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-700 transition duration-200">Profile</a>
          <a href="#" className="text-gray-700 hover:text-blue-700 transition duration-200">LogOut</a>
        </nav>

        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-blue-700 text-lg transition duration-200">Sign In</button>
          <button className="border border-gray-900 text-gray-900 hover:bg-gray-100 py-1 px-4 rounded-full text-lg transition duration-200">
            Sign Up
          </button>
        </div>
      </header>

      <div className="flex justify-center my-10">
        <article className="shadow-lg rounded-lg w-full lg:w-3/4 p-6 bg-slate-100">
          <div className="flex justify-center">
            <img
              src={blogData?.thumbnail || "https://via.placeholder.com/400"}
              alt={blogData?.title || "Blog Image"}
              className="w-full lg:w-1/2 object-cover rounded-md"
            />
          </div>

          <div className="text-center my-6">
            <h1 className="text-3xl lg:text-4xl font-bold mb-6">{blogData?.title || 'Title'}</h1>
          </div>

          <div className="flex justify-center">
            <section className="text-left text-lg lg:text-xl p-10 leading-relaxed w-full lg:w-4/5">
              <p className="mb-6">
                {blogData?.desc || 'This is a sample description text.'}
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default View;


