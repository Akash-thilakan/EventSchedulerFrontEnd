import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header({ IsLoggedIn, setIsLoggedIn }) {
  const logOut = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    toast.success("logged out")
  };
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100 group-hover:bg-indigo-700 transition-all">
              EF
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-800">
              EventFlow
            </span>
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link to="/">
              <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-slate-100 bg-white text-slate-600 text-sm font-bold hover:border-indigo-100 hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-95">
                Home
              </button>
            </Link>

            <Link to="/add-event">
              <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-slate-100 bg-white text-slate-600 text-sm font-bold hover:border-indigo-100 hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-95">
                <span className="text-lg leading-none">+</span>
                Add Event
              </button>
            </Link>

            {/* Login - Primary Button */}
            {IsLoggedIn ? (
                <button
                  onClick={logOut}
                  className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-indigo-600 transition-all shadow-md active:scale-95"
                >
                  Logout
                </button>
            ) : (
              <Link to="/login">
                <button className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-indigo-600 transition-all shadow-md active:scale-95">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
