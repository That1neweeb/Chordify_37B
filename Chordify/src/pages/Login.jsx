import InputField from "../components/InputField"
import registrationImage from '../assets/images/collage2.png';
import chordifylogo from '../assets/images/chordifylogo.png'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


function Login(){
    const location = useLocation();
    const [message, setMessage] = useState("");

     useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get("verified") === "true") {
            setMessage("Your email has been verified! You can now login.");
        }
    }, [location]);
    return(
        <>
            <div className="h-[900px] w-[1100px] rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.2)] bg-[#ADC6C7] flex justify-center items-center gap-[50px] mx-auto my-5">

                <div className='left-side flex flex-col justify-around ml-10 h-[900px] items-center'>
                        <h1 className="text-3xl font-bold text-black">Welcome back ! </h1>
                        <img src={chordifylogo} alt="" className="size-40"/>

                        {/* Show verification success message if exists */}
                        {message && <p className="text-green-600 font-medium mb-2">{message}</p>}

                    <InputField isRegistration={false}/>
                </div>
                
                <img className="w-[500px] h-[900px] relative left-[60px]" src={registrationImage} alt="registration" />
            </div>
        </>
    )
}

export default Login