import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';

const BlogPage = () => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Achieving High Productivity from Your Own Organic Farm',
      content: 'Learn tips for maximizing your organic farm’s output without compromising on quality.',
      image: '/cart.webp',
    },
    {
      id: 2,
      title: 'The Best Guide to Planting Seeds',
      content: 'Follow our comprehensive guide to ensure your seeds grow into healthy crops.',
      image: '/cart.webp',
    },
    {
      id: 3,
      title: 'Strategies for Caring for Your Garden More Efficiently',
      content: 'Use these strategies to keep your garden thriving with minimal effort.',
      image: '/cart.webp',
    },
  ]);

  const [editArticle, setEditArticle] = useState(null);

  const handleEdit = (article) => {
    setEditArticle(article);
  };

  const handleDelete = (articleId) => {
    setArticles(articles.filter(article => article.id !== articleId));
  };

  const handleSave = () => {
    setEditArticle(null);
  };

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <img
            src="/cart.webp"
            alt="Logo"
            className="h-10 w-auto"
          />
          <span className="ml-2 text-xl font-bold text-gray-900">Tech Titans</span>
        </div>

        <nav className="flex space-x-20 text-xl">
          <a href="#" className="text-gray-700 hover:text-blue-700">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-700">Profile</a>
          <a href="#" className="text-gray-700 hover:text-blue-700">LogOut</a>
        </nav>

        <div className="flex items-center space-x-4 text-xl">
          <button className="text-gray-700 hover:text-blue-700">Sign In</button>
          <button className="border border-gray-900 text-gray-900 hover:bg-gray-100 py-1 px-4 rounded-full">
            Sign Up
          </button>
        </div>
      </header>

      <article className="mb-12 mt-10">
        <header className="text-center mb-6">
          <p className="text-gray-500 mt-1">October 5th, 2023</p>
          <h1 className="text-4xl font-bold my-4">Best Strategy to Achieve Profitable Harvest</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Expert strategies for improving farm yields, choosing the right crop varieties, and maximizing profit.
          </p>
        </header>
        <img
          src="/cart.webp"
          alt="Harvest Strategy"
          className="w-full object-cover"
        />

        <section className="prose prose-lg max-w-3xl mx-auto text-xl mb-20">
          <h2>Achieve a Profitable Harvest</h2>
          <p>
            A successful and profitable harvest requires careful planning, from choosing the right crops to using effective management practices. Follow these tips to achieve the best possible results.
          </p>

          <h3>1. Selection of the Right Varieties and Seeds</h3>
          <p>
            Choosing high-quality seeds and crop varieties suited to your environment and market demands is essential for a profitable harvest.
          </p>

          <h3>2. Efficient Crop Management</h3>
          <p>
            Timely and efficient crop management, including pest control, irrigation, and fertilization, ensures that your crops are healthy and productive.
          </p>

          <h3>3. Use of Agricultural Technology</h3>
          <p>
            Embracing modern farming technologies, such as sensors and precision agriculture, can help optimize crop yields and reduce waste.
          </p>

          <h3>4. Choosing the Right Harvest Time</h3>
          <p>
            Harvesting at the right time ensures maximum yield and quality. Monitor your crops closely to determine the optimal harvest window.
          </p>
        </section>
      </article>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Related Articles</h2>
          <a href="#" className="text-green-600 hover:text-green-800">View all articles</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={article.image} alt={article.title} className="w-full object-cover" />
              <div className="p-4">
                {editArticle && editArticle.id === article.id ? (
                  <>
                    <input
                      type="text"
                      value={editArticle.title}
                      onChange={(e) => setEditArticle({ ...editArticle, title: e.target.value })}
                      className="border p-2 rounded w-full mb-2"
                    />
                    <textarea
                      value={editArticle.content}
                      onChange={(e) => setEditArticle({ ...editArticle, content: e.target.value })}
                      className="border p-2 rounded w-full mb-2"
                      rows="2"
                    />
                    <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
                      <FaSave />
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                    <p className="text-gray-600">{article.content}</p>
                    <div className="flex space-x-4 mt-4">
                      <button onClick={() => handleEdit(article)} className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(article.id)} className="text-red-600 hover:text-red-800">
                        <FaTrash />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
