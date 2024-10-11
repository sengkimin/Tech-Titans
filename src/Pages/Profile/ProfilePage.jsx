import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    additionalInfo: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userInfo);

  useEffect(() => {
    const fetchedUserInfo = {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '123-456-7890',
      address: '123 Main St, Cityville, ST 12345',
      additionalInfo: 'This is some additional info about John.',
    };
    setUserInfo(fetchedUserInfo);
    setFormData(fetchedUserInfo);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserInfo(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };
  
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className='bg-gray-300 p-6 rounded-lg shadow-lg w-1/2'>
        <div className="flex flex-col items-center mb-6 p-6">
          <img
            src="/cart.webp"
            alt="Profile"
            className="h-32 w-32 rounded-full border-4 border-gray-300 mb-4"
          />
          {isEditing && (
            <input type="file" accept="image/*" className="mb-4" />
          )}
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">User Information</h2>
        <div className='flex justify-center'>
          <div className="bg-white p-10 w-3/4 rounded-lg shadow-md ">
            <div className="flex flex-col space-y-4 text-lg ">
              {[
                { label: 'Full Name', name: 'fullName', type: 'text' },
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Phone Number', name: 'phone', type: 'tel' },
                { label: 'Address', name: 'address', type: 'text' },
                { label: 'Password', name: 'password', type: 'password' },
                { label: 'Additional Info', name: 'additionalInfo', type: 'textarea' }
              ].map(({ label, name, type }) => (
                <div className="flex " key={name}>
                  <span className="block text-gray-700 w-1/3">{label}:</span>
                  {isEditing ? (
                    type === 'textarea' ? (
                      <textarea
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className="border rounded p-2 w-2/3 "
                        rows="3"
                      />
                    ) : (
                      <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className="border rounded p-2 w-2/3 "
                        required
                      />
                    )
                  ) : (
                    <p className="text-gray-800 w-2/3">{userInfo[name]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-4 p-6">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded flex "
              >
                <FaSave className="mr-2" /> Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
              >
                <FaEdit className="mr-2" /> Edit
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded flex items-center"
              >
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







