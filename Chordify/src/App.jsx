import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Sale from "./pages/Sale";
import Buy from "./pages/Buy";
import Learn from "./pages/Learn";
import Aboutus from "./pages/Aboutus";
import RegistrationPage from "./pages/Register";
import LoginPage from "./pages/Login";
import VerificationPage from "./pages/VerificationPage";
import ViewProfile from "./components/ViewProfile";
import PasswordReset from "./components/PasswordReset";
import ChangePassword from "./components/ChangePassword";
import Logout from "./components/Logout";
import CustomerSupport from "./pages/CustomerSupport";
import ResetPassword from "./components/ResetPassword";
import UploadPage from "./pages/UploadPage";
import PostsPage from "./pages/PostsPage";
import ChordLibrary from "./pages/ChordLibrary";
function App() {
  return (
    <>
      <Navbar />
      <div className="w-full h-px bg-[#777063] mt-3"></div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sell" element={<Sale />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify/:token" element={<VerificationPage />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/postspage" element={<PostsPage />} />
        <Route path="/postspage/uploadpage" element={<UploadPage />} />
        <Route path="/chordslibrary" element={<ChordLibrary />} />
        <Route path="/profile" element={<ViewProfile />} />
        <Route path="/support" element={<CustomerSupport />} />
      </Routes>
    </>
  );
}

export default App;
