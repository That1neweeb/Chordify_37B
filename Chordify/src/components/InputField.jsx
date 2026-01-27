import google from '../assets/images/google.png';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from 'react-router-dom';
import { useApi } from "../hooks/useAPI.js"; 
import { toast } from 'react-toastify';
import { registerSchema, loginSchema } from "../schema/register.schema";

function InputField({ isRegistration = true }) {
    const navigate = useNavigate();
    const { loading, callApi } = useApi();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(isRegistration ? registerSchema : loginSchema)
    });

    const onSubmit = async (formData) => {
        try {
            const endpoint = isRegistration ? "/auth/register" : "/auth/login";

            // Ensure callApi always returns response.data
            const response = await callApi("POST", endpoint, { data: formData });

            if (isRegistration) {
                toast.success("Registration successful! Please check your email to verify your account.");
                navigate("/login");
            } else {
                localStorage.setItem("token", response?.accessToken); // save JWT
                toast.success(response.message || "Login successful");
                navigate("/"); // redirect after login
                console.log("Stored token:", localStorage.getItem("token"));
            }

        } catch (err) {
            console.error("API error:", err.response?.data?.message || err.message);
            toast.error(err.response?.data?.message || "Server error");
        }
    };

    return (
        <div className="flex flex-col">

            {isRegistration && (
                <>
                    <label htmlFor="full_name" className="text-black">Full name</label>
                    <input
                        type="text"
                        placeholder="Full name"
                        {...register("full_name")}
                        className="w-[400px] h-[50px] border border-black rounded-md bg-white text-black text-[20px] my-4 px-2"
                    />
                    {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name.message}</p>}
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
                {loading ? "Please wait..." : isRegistration ? "Create account" : "Login"}
            </button>

            {isRegistration && (
                <>
                    <div className="items-center my-5 mr-20 justify-center flex flex-col">
                        <h3 className="text-black">Already have an account ? 
                            <Link to="/login">
                                <span className="text-[#235EFF] cursor-pointer "> Sign in </span>
                            </Link> 
                        </h3>          
                    </div>
                </>
            )}

        </div>
    );
}

export default InputField;
