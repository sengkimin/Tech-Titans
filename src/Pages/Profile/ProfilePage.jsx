import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    bio: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserInfo = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://students-hackaton.vercel.app/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserInfo(response.data);
      setProfileImage(response.data.avatar); 
    } catch (error) {
      alert('Error fetching user data, please try again later.');
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('https://students-hackaton.vercel.app/user/update', userInfo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Profile updated successfully!');
      setIsEditing(false);
      fetchUserInfo(); 
    } catch (error) {
      alert('Error updating profile, please try again later.');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleImageChange = async (event) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    const file = event.target.files?.[0];

    if (!file) {
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post("https://students-hackaton.vercel.app/upload/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Image uploaded successfully:", response.data);
      const avatarUrl = response.data.url;

      const updateResponse = await fetch('https://students-hackaton.vercel.app/user/change-profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avatar: avatarUrl }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update profile');
      }

      setProfileImage(avatarUrl); 
      fetchUserInfo(); 
    } catch (err) {
      setError('Failed to upload and update image.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-gray-300 p-6 rounded-lg shadow-lg w-1/2"> 
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-4">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-blue-500"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center border-4 border-gray-400">
                <span className="text-gray-700">No Image</span>
              </div>
            )}
          </div>
          <label htmlFor="profileImage" className="cursor-pointer text-blue-600 hover:underline">
            Upload Image
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <h2 className="font-bold mb-10 text-2xl text-center">User Information</h2>
    
        <div className="flex flex-col space-y-4 text-xl">
          {['firstName', 'lastName', 'email', 'phoneNumber'].map((field) => (
            <div key={field} className="flex justify-between bg-slate-200 p-6 rounded-lg text-left">
              <label className="text-gray-700">{field.replace(/([A-Z])/g, ' $1')}: </label>
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={userInfo[field]}
                  onChange={handleChange}
                  className="border rounded p-2 w-2/3"
                />
              ) : (
                <p className="text-gray-800 w-2/3">{userInfo[field]}</p>
              )}
            </div>
          ))}
          {isEditing && (
            <div className="flex justify-between bg-slate-200 p-4 rounded-lg">
              <label className="text-gray-700">Bio:</label>
              <textarea
                name="bio"
                value={userInfo.bio}
                onChange={handleChange}
                className="border rounded p-2 w-2/3"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded flex">
                <FaSave className="mr-2" /> Save
              </button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded flex">
                <FaEdit className="mr-2" /> Edit
              </button>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded flex">
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
