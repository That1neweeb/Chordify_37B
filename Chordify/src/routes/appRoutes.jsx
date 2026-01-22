import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import Spinner from "../components/Spinner";

// Public pages
import Home from "../pages/Home";
import Aboutus from "../pages/Aboutus";

// lazy imports for other pages
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));

// Private pages
const Buy = React.lazy(() => import("../pages/Buy"));
const Sale = React.lazy(() => import("../pages/Sale"));
const Learn = React.lazy(() => import("../pages/Learn"));
const CartPage = React.lazy(() => import("../pages/CartPage"));
const ProductDescriptionPage = React.lazy(() => import("../pages/ProductDescriptionPage"));
const Song = React.lazy(() => import("../pages/Song"));
const VerificationPage = React.lazy(() => import("../pages/VerificationPage"));

import PrivateRoutes from "./PrivateRoutes";

export const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Home />} />
    <Route path="/aboutus" element={<Aboutus />} />
    <Route path="/login" element={<Suspense fallback={<Spinner />}><Login /></Suspense>} />
    <Route path="/register" element={<Suspense fallback={<Spinner />}><Register /></Suspense>} />

    {/* Private routes */}
    <Route element={<PrivateRoutes />}>
      <Route element={<Suspense fallback={<Spinner />}><Outlet /></Suspense>}>
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sale />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product-description" element={<ProductDescriptionPage />} />
        <Route path="/song" element={<Song />} />
        <Route path="/verification" element={<VerificationPage />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />

  </Routes>
);
