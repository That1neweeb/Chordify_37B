import { useState } from 'react'
import RegisterCard from "./components/RegisterCard"
import Register from "./pages/Register"
function App() {
  return (
    // <h2>Hello</h2>
   <>
      <Navbar/>
     
      <div className="w-full h-px bg-[#777063] mt-3"></div> 

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Sell" element={<Sale/>}></Route>
        <Route path="/Buy" element={<Buy/>}></Route>
        <Route path="/Learn" element={<Learn/>}></Route>
        <Route path="/Aboutus" element={<Aboutus/>}></Route> 
        <Route path="/register" element={<RegistrationPage/>}></Route> 
        <Route path="/login" element={<LoginPage/>}></Route> 
        <Route path="/verify/:token" element={<VerificationPage />} />
      </Routes>  

    </>
    
  )
}

export default App
