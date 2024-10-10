

import React from 'react';

const ViewPage = () => {
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
                <article className="shadow-lg rounded-lg w-full lg:w-3/4 p-6  bg-slate-100">
                    <div className="flex justify-center">
                        <img
                            src="/cart.webp"
                            alt="Harvest Strategy"
                            className="w-full lg:w-1/2 object-cover rounded-md"
                        />
                    </div>

                    <div className="text-center my-6">
                        <h1 className="text-3xl lg:text-4xl font-bold mb-6">Best Strategy to Achieve</h1>
                    </div>

                    <div className="flex justify-center">
                        <section className="text-left text-lg lg:text-xl leading-relaxed w-full lg:w-4/5">
                            <p className="mb-6">
                                A successful and profitable harvest requires careful planning, from choosing the right crops to using effective management practices. Follow these tips to achieve the best possible results.
                            </p>
                            <p className="mb-6">
                                Choosing high-quality seeds and crop varieties suited to your environment and market demands is essential for a profitable harvest.
                            </p>
                            <p className="mb-6">
                                Timely and efficient crop management, including pest control, irrigation, and fertilization, ensures that your crops are healthy and productive.
                            </p>
                            <p className="mb-6">
                                Embracing modern farming technologies, such as sensors and precision agriculture, can help optimize crop yields and reduce waste.
                            </p>
                            <p>
                                Harvesting at the right time ensures maximum yield and quality. Monitor your crops closely to determine the optimal harvest window.
                            </p>
                        </section>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default ViewPage;
