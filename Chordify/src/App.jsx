import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
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