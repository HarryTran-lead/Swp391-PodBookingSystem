import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './UserPages/Header/Header';
import Footer from './UserPages/Footer/Footer';
import HomePage from './UserPages/HomePage/HomePage';
import About from './UserPages/About/About';
import LoginPage from './UserPages/LoginPage/LoginPage'; // Import your LoginPage
import SignUpPage from './UserPages/SignUpPage/SignUppage';
import Contact from './UserPages/Contact/Contact'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
    <Header/>
      <Routes>
        
        <Route path="/SWP391-PodSystemBooking" element={<HomePage />} />
        <Route path="/SWP391-PodSystemBooking/login" element={<LoginPage />} />
        <Route path="/SWP391-PodSystemBooking/about" element={<About />} />
        <Route path="/SWP391-PodSystemBooking/signup" element={<SignUpPage />} /> 
        <Route path="/SWP391-PodSystemBooking/contact" element={< Contact/>} /> 
       
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
