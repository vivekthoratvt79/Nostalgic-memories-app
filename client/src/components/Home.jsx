import React, { useEffect } from 'react';
import Posts from './Posts';
import Navbar from './Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './Auth';

const Home = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path='/' element={<Posts />}></Route>
        <Route path='/auth' element={<Auth />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Home;
