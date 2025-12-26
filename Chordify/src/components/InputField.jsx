import google from '../assets/images/google.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function InputField({isRegistration = true}) {
    
    const navigate = useNavigate();
    const [full_name, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [c_password, setCPassword] = useState("");

    const handleRegistration = async(e) => {
        e.preventDefault();
        try {
            const endpoint = isRegistration ? "register" : "login"
            const bodyData = isRegistration
                ? { full_name, email, password, c_password }
                : { email, password };

            const response = await fetch(`http://localhost:5000/auth/${endpoint}`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(bodyData),
            });
            const data = await response.json();

             if (response.ok) {
           
                
                 if (isRegistration) {
                        alert('Registration successful! Please check your email to verify your account before logging in.');
                        navigate('/login');
                 } else {
                         alert(data.message);
                        navigate('/');
                    }
            } else {
                alert(data.message);
            }
            
        } catch(err) {
            console.log("Frontend error : ", err);
            alert("Something went wrong")
            
        }
    }

    return( 
    <div className="flex flex-col">

          {isRegistration && (
                <>
                    <label htmlFor="full_name" className="text-black">Full name</label>
                    <input
                        type="text"
                        placeholder="fullname"
                        name="fullname"
                        className="w-[400px] h-[50px] border border-black rounded-md bg-white text-black text-[20px] my-4 px-2"
                        value={full_name}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </>
            )}

            <label htmlFor="email" className='text-black'>Email</label>
            <input 
            type="email" 
            placeholder="Email" 
            name='email'
            className="w-[400px] h-[50px] border border-black rounded-md bg-white text-black text-[20px] my-4 px-2" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className='text-black'>Password</label>
            <input 
            type="password" 
            placeholder="Password" 
            name='password' 
            className="w-[400px] h-[50px] border border-black rounded-md bg-white text-black text-[20px] my-4 px-2" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            {isRegistration && (
                <>
                    <label htmlFor="c_password" className="text-black">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="c_password"
                        className="w-[400px] h-[50px] border border-black rounded-md bg-white text-black text-[20px] my-4 px-2"
                        value={c_password}
                        onChange={(e) => setCPassword(e.target.value)}
                    />
                </>
            )}

            <button
                className="w-[400px] h-[50px] border border-black rounded-md bg-[#364737] text-[20px] mt-7"
                onClick={handleRegistration}
            >
                {isRegistration ? 'Create account' : 'Login'}
            </button>

            {isRegistration && (
                <>
                    <div className="flex items-center my-5 mr-20">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-3 text-gray-500">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <button className="flex items-center justify-center w-[400px] h-[50px] gap-2 border border-black rounded-md bg-[#E0E0E0] text-black mt-1">
                        <img src={google} alt="" className="h-4" />
                        Sign up with Google
                    </button>
                </>
            )}

        </div>
        );
}

export default InputField;