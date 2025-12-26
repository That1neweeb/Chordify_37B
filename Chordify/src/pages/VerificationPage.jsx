import {useEffect, useState, useRef} from "react"
import { useParams, useNavigate } from "react-router-dom";

function VerificationPage() {

    const hasVerified = useRef(false);
    const {token} = useParams();
    const [message, setMessage] = useState("Verifying....")
    const [verified, setVerified] = useState(false);
    const navigate = useNavigate();


      useEffect(()=> {

        const verifyEmail = async() => {
            if(hasVerified.current) {
                return;
            }
            hasVerified.current = true;
            try {
 
                const res = await fetch(`http://localhost:5000/users/verify/${token}`);
                const data = await res.json();

                setMessage(data.message);

                if(res.ok) {
                    setVerified(true);
                }

            } catch(err) {
                setMessage("Something went wrong. Please try again");
            }
        };
        if(token) verifyEmail();
        }, [token]);

        
    const handleGoToLogin = () => {
        navigate("/login"); 
    };
    return(
           <div className="flex flex-col justify-center items-center h-screen mt-20">
            <h1 className="text-2xl font-bold mb-4">{message}</h1>

            {verified && (
                <button
                    onClick={handleGoToLogin}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                >
                    Go to Login
                </button>
            )}
        </div>
    );
}

export default VerificationPage;