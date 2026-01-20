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
function App() {
  return (
 
   <>
      <Navbar/>
     
      <div className="w-full h-px bg-[#777061] mt-3"></div> 

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Sell" element={<Sale/>}></Route>
        <Route path="/Buy" element={<Buy/>}></Route>
        <Route path="/Learn" element={<Learn/>}></Route>
        <Route path="/Aboutus" element={<Aboutus/>}></Route> 
        <Route path="/register" element={<RegistrationPage/>}></Route> 
        <Route path="/login" element={<LoginPage/>}></Route> 
        <Route path="/verify/:token" element={<VerificationPage />} />
        <Route path="/PostsPage/UploadPage" element={<UploadPage/>}/>
        <Route path="/PostsPage" element={<PostsPage/>} />
        <Route path="/Chordslibrary" element={<ChordLibrary/>} />
      </Routes>  

    </>
    
  )
}

export default App