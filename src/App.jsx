import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/Login/LoginPage';
import RegisterPage from './Pages/SignUp/SignUpPage';
import BlogPage from './Pages/Blog/BlogPage';
import ProfilePage from './Pages/Profile/ProfilePage';
import ViewPage from './Pages/View/ViewPage';
import './App.css';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogPage />} />
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
        <Route path="/profile" element={<ProfilePage/>}></Route>
        <Route path="/blog/:id" element={<ViewPage />}></Route>
        

 
  
      </Routes>
    </Router>
  );
}

export default App;
