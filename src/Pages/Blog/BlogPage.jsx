import React, { Fragment, useEffect, useState } from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import Navbar from "../../Component/Navbar";
import Modal from "../../Component/Modal";

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [editArticle, setEditArticle] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({ title: "", content: "", thumbnail: "" });
  const token = localStorage.getItem("token");

  
    const fetchArticles = async (url) => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }

        const data = await response.json();

        if (Array.isArray(data.blogs)) {
          setArticles(data.blogs);
        } else {
          console.error("Expected data to be an array:", data.blogs);
          setArticles([]);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    useEffect(() => {
      fetchArticles("https://students-hackaton.vercel.app/blog/get-all-blogs");
  }, []);

  const handleEdit = (article) => {
    setEditArticle(article);
    setModalData(article); // Set modal data for editing
    setModalVisible(true); // Open modal for editing
  };

  const handleDelete = async (articleId) => {
    try {
      const response = await fetch(`https://students-hackaton.vercel.app/blog/delete-blog/${articleId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete article");
      }

      setArticles(articles.filter((article) => article.id !== articleId));
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleSave = () => {
    setArticles(articles.map(article =>
      article.id === editArticle.id ? editArticle : article
    ));
    setEditArticle(null);
    setModalVisible(false); // Close modal after saving
  };

  const handleNewArticleSave = (newArticle) => {
    setArticles([...articles, newArticle]); // Update local state with new article
    setModalVisible(false); // Close modal after saving
  };

  return (
    <Fragment>
      <div className="container mx-auto p-6">
    
        <Navbar />
        <div className='flex fixed top-0 w-[20%]'>
              <button
                onClick={() => fetchArticles('https://students-hackaton.vercel.app/blog/get-all-blog-public')}
                className='w-[150%] py-2 text-black  mt-10 rounded border-white hover:bg-blue-800'
              >
                GET ALL PUBLIC BLOGS
              </button>
              <button
                onClick={() => fetchArticles('https://students-hackaton.vercel.app/blog/get-all-blogs')}
                className='w-[100%] py-2 text-black  mt-10 rounded border-white hover:bg-blue-800 ml-3'
              >
                GET ALL BLOGS
              </button>
            </div>
        
      
        

        <div className="mt-[100px]">
          <header className="text-center">
            <h1 className="text-4xl font-bold my-4">
              Best Strategy to Achieve Profitable Harvest
            </h1>
            
            <p className="text-gray-600 max-w-4xl text-xl mx-auto">
              Expert strategies for improving farm yields, choosing the right crop varieties, and maximizing profit.
            </p>
          </header>
          <div className="flex mt-[100px] mb-24">
            <img
              src="https://i.pinimg.com/564x/34/af/95/34af9511f09da81fb256933a319a2a8e.jpg"
              alt="Harvest Strategy"
              className="w-1/2 object-cover"
            />
            <section className="prose prose-lg max-w-6xl text-2xl mt-20  ml-8">
              <p>
                A successful and profitable harvest requires careful planning,
                from choosing the right crops to using effective management
                practices. Follow these tips to achieve the best possible results.
              
             
                Choosing high-quality seeds and crop varieties suited to your
                environment and market demands is essential for a profitable
                harvest.
           
        
                Timely and efficient crop management, including pest control,
                irrigation, and fertilization, ensures that your crops are
                healthy and productive.
       
                Embracing modern farming technologies, such as sensors and
                precision agriculture, can help optimize crop yields and reduce
                waste.
         
                Harvesting at the right time ensures maximum yield and quality.
                Monitor your crops closely to determine the optimal harvest
                window.
              </p>
            </section>
          </div>
        </div>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Related Articles</h2>
            <button
              onClick={() => {
                setModalVisible(true);
                setModalData({ title: "", content: "", thumbnail: "" }); 
              }}
              className="text-2xl font-bold bg-blue-700 rounded-md p-4 text-white"
            >
              Create New Blog
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.length > 0 ? (
              articles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="object-cover w-full h-48"
                  />
                  <div className="p-4">
                    {editArticle && editArticle.id === article.id ? (
                      <>
                        <input
                          type="text"
                          value={editArticle.title}
                          onChange={(e) =>
                            setEditArticle({
                              ...editArticle,
                              title: e.target.value,
                            })
                          }
                          className="border p-2 rounded w-full mb-2"
                        />
                        <textarea
                          value={editArticle.content}
                          onChange={(e) =>
                            setEditArticle({
                              ...editArticle,
                              content: e.target.value,
                            })
                          }
                          className="border p-2 rounded w-full mb-2"
                          rows="2"
                        />
                        <button
                          onClick={handleSave}
                          className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                          <FaSave />
                        </button>
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                        <p className="text-gray-600">{article.content}</p>
                        <div className="flex space-x-4 mt-4">
                          <button
                            onClick={() => handleEdit(article)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No articles found.</p>
            )}
          </div>
        </section>

        {modalVisible && (
          <Modal
            onClose={() => setModalVisible(false)}
            modalData={modalData} // Pass the modalData
            setModalData={setModalData} // Pass the setModalData
            onSave={handleNewArticleSave} // Pass the save function
          />
        )}
      </div>
    </Fragment>
  );
};

export default BlogPage;
