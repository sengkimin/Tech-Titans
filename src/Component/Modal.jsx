import React, { useState } from "react";
import axios from "axios";

const Modal = ({ onClose, modalData, setModalData}) => {
  const { title, desc } = modalData;
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token= localStorage.getItem('token')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      if (thumbnailFile) {
        formData.append("file", thumbnailFile); 

        const uploadResponse = await axios.post("https://students-hackaton.vercel.app/upload/upload-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Image uploaded successfully:", uploadResponse.data);
        const thumbnailUrl = uploadResponse.data.url;

        const articleData = { title, desc, thumbnail: thumbnailUrl };
        
        const articleResponse = await fetch("https://students-hackaton.vercel.app/blog/create-blog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(articleData),
        });

        if (!articleResponse.ok) {
          const errorText = await articleResponse.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        const data = await articleResponse.json();
        console.log("Article created:", data);
        onClose();
      } else {
        const articleData = { title, desc };
        const articleResponse = await fetch("https://students-hackaton.vercel.app/blog/create-blog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(articleData),
        });

        if (!articleResponse.ok) {
          const errorText = await articleResponse.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        const data = await articleResponse.json();
        console.log("Article created:", data);
        onClose(); 
      }
    } catch (err) {
      setError('Failed to upload and create article.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create New Article</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setModalData({ ...modalData, title: e.target.value })}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="desc">
              Description
            </label>
            <textarea
              id="desc"
              value={desc}
              onChange={(e) => setModalData({ ...modalData, desc: e.target.value })}
              className="border p-2 rounded w-full"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="thumbnail">
              Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files[0])}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-600 text-white px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
