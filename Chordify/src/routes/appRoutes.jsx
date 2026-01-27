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
const MyListingPage = React.lazy(()=> import("../pages/MyListingPage"));
const EditProductPage = React.lazy(()=> import("../pages/EditProductPage"));
const FavouritePage = React.lazy(()=> import("../pages/FavouritePage"));
const CustomerSupport = React.lazy(()=> import("../pages/CustomerSupport"));
const ViewProfile = React.lazy(()=> import("../components/ViewProfile"));
const PostPage = React.lazy(()=> import("../pages/PostsPage"));
const CheckoutPage = React.lazy(()=> import("../pages/CheckoutPage"));
const OrderSuccessPage = React.lazy(()=> import("../pages/OrderSuccessPage"));
const OrderPage = React.lazy(()=> import("../pages/OrderPage"));


import PrivateRoutes from "./PrivateRoutes";


export const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Home />} />
    <Route path="/aboutus" element={<Aboutus />} />
    <Route path="/login" element={<Suspense fallback={<Spinner />}><Login /></Suspense>} />
    <Route path="/register" element={<Suspense fallback={<Spinner />}><Register /></Suspense>} />
    <Route path="/support" element={<Suspense fallback={<Spinner />}><CustomerSupport /></Suspense>} />

    {/* Private routes */}
    <Route element={<PrivateRoutes />}>
      <Route element={<Suspense fallback={<Spinner />}><Outlet /></Suspense>}>
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sale />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="products/:id" element={<ProductDescriptionPage />} />
        <Route path="/song" element={<Song />} />
        <Route path="/mylistings" element={<MyListingPage />} />
        <Route path="/products/edit/:id" element={<EditProductPage />} />
        <Route path="/favourites" element={<FavouritePage/>}></Route>
        <Route path="/profile" element={<ViewProfile/>}></Route>
        <Route path="/posts" element={<PostPage/>}></Route>
        <Route path="/checkout" element={<CheckoutPage/>}></Route>
        <Route path="/orders" element={<OrderPage/>}></Route>
        <Route path="/order-success" element={<OrderSuccessPage/>}></Route>

      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />

  </Routes>
);
