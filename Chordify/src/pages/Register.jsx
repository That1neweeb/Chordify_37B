import { useNavigate } from "react-router-dom";
import registrationImage from '../assets/images/collage2.png'
import InputField from '../components/InputField'


function RegistrationPage(){
        
    const navigate = useNavigate();

    return(
        <>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-4 ml-10 px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
                    >
                        &larr; Back to Landing
                    </button>
            <div className="h-[900px] w-[1100px] rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.2)] bg-[#ADC6C7] flex justify-center items-center gap-[50px] mx-auto my-5">

                <div className='left-side flex flex-col justify-around ml-10 h-[900px]'>
                    <div>
                        <h1 className="text-3xl font-bold text-black">Join Chordify</h1> <br />
                        <p className='text-black'>Sign up today and discover, learn, and play like never before.</p>
                    </div>

                    <InputField isRegistration={true}/>
                </div>
                
                <img className="w-[500px] h-[900px] relative left-[60px]" src={registrationImage} alt="registration" />
            </div>
        </>
    )
}

export default RegistrationPage