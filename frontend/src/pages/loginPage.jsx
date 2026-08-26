import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    // Fallback since @react-oauth/google is missing from package.json
    const googleLogin = () => {
        toast.error("Google login currently unavailable");
    };

    function handleLogin(){
        console.log("Email: ", email);
        console.log("Password: ", password);
        //backend localhost:3000/users/login

        axios.post(import.meta.env.VITE_API_URL+"/users/login",{
            email : email,
            password : password
        }).then((response)=>{

            console.log(response.data);
            localStorage.setItem("token" , response.data.token); //save the token in local storage of the browser
            //alert("Login successful!");
            toast.success("Login successful!");
            if(response.data.isAdmin){
                //redirect to admin dashboard
                //window.location.href = "/admin"
                
                navigate("/admin")
            }else{
                //redirect to homepage
                //window.location.href = "/"
                navigate("/")
            }

        }).catch((error)=>{
            //alert(error.response.data.message);
            toast.error(error.response.data.message)
        });
    }

	return (
        <div className="flex w-full h-screen bg-[#050505] text-white overflow-hidden font-sans">
            {/* Left Image Section - Hidden on small screens */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden group">
                <img 
                    src="/premium-watch-bg.png" 
                    alt="Premium Watch" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[20000ms] group-hover:scale-110 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent flex flex-col justify-end p-16 pb-24">
                    <h2 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-2xl animate-fade-in-up">
                        Time. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Perfected.</span>
                    </h2>
                    <p className="mt-6 text-xl text-gray-300 font-light max-w-md animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        Experience the ultimate collection of luxury timepieces curated for connoisseurs.
                    </p>
                </div>
            </div>

            {/* Right Form Section */}
            <div className="w-full lg:w-1/2 flex justify-center items-center p-8 bg-[#050505] relative overflow-hidden">
                {/* Ambient glow in background */}
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-20%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10 z-10 animate-fade-in relative overflow-hidden">
                    {/* Gloss Reflection inside card */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>

                    <h1 className="text-3xl font-bold mb-2 text-white tracking-tight">
                        Sign In
                    </h1>
                    <p className="text-gray-400 mb-10 text-sm font-light">Access your exclusive Veloura account</p>
                    
                    <div className="space-y-6">
                        <div className="group">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-2 group-focus-within:text-amber-400 transition-colors">
                                Email
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="name@example.com"
                                className="w-full p-4 bg-black/40 text-white rounded-xl border border-white/10 focus:border-amber-400/50 focus:bg-black/60 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 placeholder:text-gray-600 font-light"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-2 group-focus-within:text-amber-400 transition-colors flex justify-between">
                                Password
                                <Link to="/forgot-password" className="text-amber-400/80 hover:text-amber-400 normal-case tracking-normal">Forgot?</Link>
                            </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                placeholder="••••••••"
                                type="password"
                                className="w-full p-4 bg-black/40 text-white rounded-xl border border-white/10 focus:border-amber-400/50 focus:bg-black/60 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 placeholder:text-gray-600 font-light"
                            />
                        </div>

                        <button 
                            onClick={handleLogin} 
                            className="w-full py-4 mt-8 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:via-amber-300 hover:to-amber-400 text-black font-bold uppercase tracking-[0.1em] rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.2)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.4)] hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98]"
                        >
                            Sign In
                        </button>

                        <div className="relative flex items-center py-6">
                            <div className="flex-grow border-t border-white/10"></div>
                            <span className="flex-shrink-0 mx-4 text-[10px] font-semibold text-gray-500 uppercase tracking-[0.2em]">or</span>
                            <div className="flex-grow border-t border-white/10"></div>
                        </div>

                        <button 
                            onClick={googleLogin}  
                            className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl flex justify-center items-center gap-3 transition-all duration-300 hover:shadow-xl active:scale-[0.98] group" 
                        >
                            <FcGoogle className="text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"/> 
                            <span className="tracking-wide">Sign in with Google</span>
                        </button>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-400 font-light">
                        Don't have an account? <Link to="/sign-up" className="text-amber-400 font-medium hover:underline hover:text-amber-300 transition-colors ml-1">Register here</Link>
                    </p>
                </div>
            </div>
        </div>
	);
}
