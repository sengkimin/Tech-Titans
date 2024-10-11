import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircleLoader from "react-spinners/CircleLoader";
import Navbar from "../../Component/Navbar";
const View = () => {
    const { id } = useParams();
    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "black",
    };


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
        return <div className="flex items-center justify-center h-screen">
            <CircleLoader
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    }


    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <Navbar />




            <div className='flex justify-start ml-44 mt-20'>
                <button
                    onClick={() => navigate('/')}
                    className='bg-slate-300 text-lg w-28 h-10 rounded'
                >
                    Back
                </button>
            </div>

            <div className="flex justify-center my-10">
                <article className="shadow-lg rounded-lg w-full lg:w-3/4 p-10 bg-slate-100">
                    <div className="flex justify-center">
                        <img
                            src={blogData?.thumbnail || "https://via.placeholder.com/400"}
                            alt={blogData?.title || "Blog Image"}
                            className="w-full lg:w-3/4 object-cover rounded-md shadow-sm"
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


