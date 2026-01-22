import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Sale from "./pages/Sale";
import Buy from "./pages/Buy";
import Learn from "./pages/Learn";
import Aboutus from "./pages/Aboutus";
import {Routes, Route} from "react-router-dom"
import RegistrationPage from "./pages/Register";
import LoginPage from "./pages/Login";
import VerificationPage from "./pages/VerificationPage";
import UploadPage from "./pages/UploadPage";
import PostsPage from "./pages/PostsPage";
import ChordLibrary from "./pages/ChordLibrary";
import { AppRoutes } from "./routes/appRoutes";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <>
     <ToastContainer />
      {!hideNavbar && <Navbar />}
      {!hideNavbar && <div className="w-full h-px bg-[#777061] mt-3"></div>}
      <AppRoutes />
    </>
  )
}


export default App;