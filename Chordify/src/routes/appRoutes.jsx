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
const LyricsPage = React.lazy(() => import("../pages/LyricsPage"));
const MyListingPage = React.lazy(()=> import("../pages/MyListingPage"));
const EditProductPage = React.lazy(()=> import("../pages/EditProductPage"));
const FavouritePage = React.lazy(()=> import("../pages/Favouritepage"));
const PostsPage = React.lazy(() => import("../pages/PostsPage")); 
const Chordslibrary = React.lazy(() => import("../pages/ChordLibrary"));
const UploadPage = React.lazy(() => import("../pages/UploadPage"));
const MyUploads = React.lazy(() => import("../pages/MyUploads"));
const TabExercisesPage = React.lazy(() => import("../pages/TabExercisesPage"));
const StrummingPatternPage = React.lazy(() => import("../pages/StrummingPatternPage"));

import PrivateRoutes from "./PrivateRoutes";

export const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Home />} />
    <Route path="/aboutus" element={<Aboutus />} />
    <Route path="/login" element={<Suspense fallback={<Spinner />}><Login /></Suspense>} />
    <Route path="/register" element={<Suspense fallback={<Spinner />}><Register /></Suspense>} />
    <Route path="/chords" element={<Suspense fallback={<Spinner/>}> <Chordslibrary /> </Suspense> } />
    <Route path="/strumming" element={<Suspense fallback={<Spinner/>}> <StrummingPatternPage /> </Suspense> }/>
    <Route path="/exercise" element={<Suspense fallback={<Spinner/>}> <TabExercisesPage /> </Suspense> } />

    {/* Private routes */}
    <Route element={<PrivateRoutes />}>
      <Route element={<Suspense fallback={<Spinner />}><Outlet /></Suspense>}>
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sale />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="products/:id" element={<ProductDescriptionPage />} />
        <Route path="/lyrics/:id" element={<LyricsPage />} />
        <Route path="/mylistings" element={<MyListingPage />} />
        <Route path="/products/edit/:id" element={<EditProductPage />} />
        <Route path="/favourites" element={<FavouritePage/>}></Route>
        <Route path="/posts/uploadPage" element={<UploadPage/>} />
        <Route path="/posts" element={<PostsPage/>}/>
        <Route path="/posts/myUploads" element={<MyUploads/>}/>
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />

  </Routes>
);
