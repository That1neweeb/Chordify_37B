import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Register from "./pages/Register"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import LoginCard from './components/LoginCard'
import Learn from './pages/Learn'
import Sale from './pages/Sale'
// import Song from './pages/Song.jsx'
function App() {
  return (
    // <h2>Hello</h2>
   <>
      <Navbar/>
     
      <div className="w-full h-px bg-[#777063] mt-3"></div> 

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Sell" element={<Sale/>}></Route>
        {/* <Route path="/Buy" element={<Buy/>}></Route> */}
        <Route path="/Learn" element={<Learn/>}></Route>
        {/* <Route path="/Aboutus" element={<Aboutus/>}></Route>  */}
        <Route path="/register" element={<Register/>}></Route> 
        <Route path="/login" element={<LoginCard/>}></Route> 
        {/* <Route path="/verify/:token" element={<VerificationPage />} /> */}
      </Routes>  

    </>
    
  )
}

export default App
