import React, { useEffect, useState } from 'react';
import { loginAPI } from '../Service/allAPI';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({setIsLoggedIn}) => {
 const navigate = useNavigate()
  const [adminData, setAdminData] = useState({
    userMail:"",
    password:""
  });


  const login = async()=>{
    const result = await loginAPI(adminData)
    if(result.status==200){
      toast.success("login successfull");
      navigate("/")   
      setIsLoggedIn(true)
      sessionStorage.setItem("admin",JSON.stringify(adminData))
    }else if(result.status==409){
      toast.error("invalid credentials");
      
    }else{
      toast.warning("No admin found");
      
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-200 blur-[150px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-200 blur-[150px]"></div>
      </div>

      <div className="w-full max-w-md z-10">
        {/* Branding Section */}
        <div className="text-center mb-10">
          <div className="inline-flex w-14 h-14 bg-indigo-600 rounded-2xl items-center justify-center text-white font-bold text-xl shadow-2xl shadow-indigo-200 mb-6">
            EF
          </div>
          <h2 className="text-4xl font-black  text-slate-900">Admin Login</h2>
          <p className="mt-3 text-slate-500 font-medium">Access your  event dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-10 border border-gray-100 shadow-2xl shadow-indigo-900/5 rounded-[3rem]">
          <form className="space-y-7">
            
            {/* Email Field */}
            <div>
              <label className="font-black text-slate-400 mb-3 ml-1">
                Email Address
              </label>
              <input
              value={adminData.userMail}
              onChange={(e)=>setAdminData({...adminData,userMail:e.target.value})}
                type="email"
                placeholder="Enter Your Email"
                className="block w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[1.5rem] text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-3 ml-1">
                <label className="font-black  text-slate-400 ml-1">
                  Password
                </label>
                
              </div>
              <input
              value={adminData.password}
              onChange={(e)=>setAdminData({...adminData,password:e.target.value})}
                type="password"
                placeholder="Password"
                className="block w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[1.5rem] text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
              />
            </div>

          

            {/* Submit Button */}
            <button
            onClick={login}
              type="button"
              className="w-full py-5 px-4 rounded-[1.5rem] bg-slate-900 hover:bg-indigo-600 text-white font-black tracking-tight transition-all shadow-lg hover:shadow-indigo-200 active:scale-[0.97]"
            >
              Login to EventFlow
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;