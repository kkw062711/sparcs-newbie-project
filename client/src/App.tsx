import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import RegisterPage from './pages/register';
import RoomcreatePage from './pages/roomcreate'
import RoomPage from "./pages/room";
import ErrorPage from "./pages/error"
import Header from './components/header';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/roomcreate" element={<RoomcreatePage />} />
          <Route path="/room" element={<RoomPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
