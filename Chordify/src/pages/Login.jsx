import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import registrationImage from '../assets/images/collage2.png';
import chordifylogo from '../assets/images/chordifylogo.png';

function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get("verified") === "true") {
            setMessage("Your email has been verified! You can now login.");
        }
    }, [location]);

    return (
        <>
          {/* Back button */}
                    <button
                        onClick={() => navigate("/")}
                        className="mt-4 ml-10 px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
                    >
                        &larr; Back to Landing
                    </button>
            <div className="h-[900px] w-[1100px] rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.2)] bg-[#ADC6C7] flex justify-center items-center gap-[50px] mx-auto my-5">

                <div className='left-side flex flex-col justify-around ml-10 h-[900px] items-center'>
                    <h1 className="text-3xl font-bold text-black">Welcome back ! </h1>
                    <img src={chordifylogo} alt="" className="size-40"/>

                    {/* Show verification success message if exists */}
                    {message && <p className="text-green-600 font-medium mb-2">{message}</p>}

                    <InputField isRegistration={false}/>

                    <h3 className="text-black">Don't have an account ? 
                        <Link to="/register">
                            <span className="text-[#235EFF] cursor-pointer "> Sign up</span>
                        </Link> 
                    </h3>
                </div>
                
                <img className="w-[500px] h-[900px] relative left-[60px]" src={registrationImage} alt="registration" />
            </div>
        </>
    );
}

export default Login;
