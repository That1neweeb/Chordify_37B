import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout'; // <-- import layout
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProductListing from './pages/Admin/ProductListing';
import UserListing from './pages/Admin/UserListing';
import GuitarListing from './pages/Admin/GuitarListing';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import React from 'react';

function App() {
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/users" element={<UserListing />} />
          <Route path="/guitars" element={<GuitarListing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
