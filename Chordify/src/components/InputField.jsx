import google from '../assets/images/google.png'
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"
import { useNavigate } from 'react-router-dom';
import { useApi } from "../hooks/useAPI.js"; 
import { toast } from 'react-toastify';
import { registerSchema, loginSchema } from "../schema/register.schema";



function InputField({isRegistration = true}) {
    

    const navigate = useNavigate();

    //custom hook 
    const { loading, error, callApi } = useApi();

    //react hook form
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm(
       { resolver:zodResolver(isRegistration? registerSchema: loginSchema)}
    );

    const onSubmit = async (formData) => {
        try {
            const endpoint = isRegistration ? "/auth/register" : "/auth/login";
            const data = await callApi("POST", endpoint, { data: formData });

            if (isRegistration) {
                toast.success(
                    "Registration successful! Please check your email to verify your account."
                );
                navigate("/login");
            } else {
                localStorage.setItem("token", data.accessToken);
                toast.success(data.message || "Login successful");
                navigate("/");
            }
        } catch (err) {
            console.log("API error:", err.message);
            toast.error(err.message);
        }
    };


    return( 
    <div className="flex flex-col">

          {isRegistration && (
                <>
                    <label htmlFor="full_name" className="text-black">Full name</label>
                    <input
                        type="text"
                        placeholder="fullname"
                        {...register("fullname")}
                        className="w-[400px] h-[50px] border border-black rounded-md bg-white text-black text-[20px] my-4 px-2"
                       
                    />
                    {errors.fullname && (
                        <p className="text-red-500 text-sm">{errors.fullname.message}</p>
                    )}
                </>
            )}

            <label htmlFor="email" className='text-black'>Email</label>
            <input 
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-[400px] h-[50px] border border-black rounded-md bg-white text-black text-[20px] my-4 px-2"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <label htmlFor="password" className='text-black'>Password</label>
            <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-[400px] h-[50px] border border-black rounded-md bg-white text-black text-[20px] my-4 px-2"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            {isRegistration && (
                <>
                    <label htmlFor="c_password" className="text-black">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        {...register("c_password")}
                        className="w-[400px] h-[50px] border border-black rounded-md bg-white text-black text-[20px] my-4 px-2"
                    />
                    {errors.c_password && <p className="text-red-500 text-sm">{errors.c_password.message}</p>}
                </>
            )}

            <button
                disabled={loading}
                className="w-[400px] h-[50px] border border-black rounded-md bg-[#364737] text-[20px] mt-7"
                onClick={handleSubmit(onSubmit)}
            >
                {loading? "Please wait...." : isRegistration ? 'Create account' : 'Login'}
            </button>

            {isRegistration && (
                <>
                    <div className="flex items-center my-5 mr-20">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-3 text-gray-500">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <button disabled={loading} className="flex items-center justify-center w-[400px] h-[50px] gap-2 border border-black rounded-md bg-[#E0E0E0] text-black mt-1">
                        <img src={google} alt="" className="h-4" />
                        Sign up with Google
                    </button>
                </>
            )}


        </div>
        );
}

export default InputField;