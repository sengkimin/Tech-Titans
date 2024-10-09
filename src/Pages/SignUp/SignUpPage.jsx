import React from 'react'

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-2/5 bg-gray-900 text-white p-12 items-center">
        <img src="/cart.webp" alt="Logo" className="mb-8 w-32 rounded-full" />
        
        <h1 className="text-4xl mt-9 font-bold leading-tight">     Welcome to Our Blog!</h1>
        <p className="mt-6 text-xl">
  Be the first to explore trending topics and gain knowledge that can transform your perspective-sign up now and start your journey with us!
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
          
          <form>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-start  text-lg mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-4 py-3 rounded"
                  placeholder="first name"
                />
              </div>
              <div>
                <label className="block text-start  text-lg mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-4 py-3 rounded"
                  placeholder="last name"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-start text-lg mb-2">Email</label>
              <input
                type="email"
                className="w-full border   border-gray-300 px-4 py-3 rounded"
                placeholder="name@example.com"
              />
            </div>

       


            <div className="mb-10">
              <label className="block text-start text-lg mb-2">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 px-4 py-3 rounded"
                    placeholder="password"
              />
            </div>

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
}

export default RegisterPage;