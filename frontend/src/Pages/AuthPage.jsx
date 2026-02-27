import React, { useState } from 'react';
import Login from './login';
import Register from './Register';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 font-sans">
      <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        <div className={`absolute top-0 w-1/2 h-full transition-all duration-700 ease-in-out z-10 ${isSignUp ? 'translate-x-full' : 'translate-x-0'}`}>
          <div className={`absolute inset-0 transition-all duration-700 ${isSignUp ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
            <Login/>
          </div>          
          <div className={`absolute inset-0 transition-all duration-700 ${isSignUp ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <Register />
          </div>
        </div>
        
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out z-50 ${isSignUp ? '-translate-x-full rounded-r-[100px]' : 'rounded-l-[100px]'}`}>
          <div className={`relative -left-full h-full w-[200%] bg-gradient-to-r from-indigo-500 to-purple-600 text-white transition-all duration-700 ease-in-out ${isSignUp ? 'translate-x-1/2' : 'translate-x-0'}`}>
            <div className="flex h-full">
              
              <div className={`w-1/2 flex flex-col items-center justify-center p-10 text-center transition-all duration-700 ${isSignUp ? 'translate-x-0' : '-translate-x-[20%]'}`}>
                <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
                <p className="mb-8">Already have an account?</p>
                <button onClick={() => setIsSignUp(false)} className="border-2 border-white px-12 py-3 rounded-lg font-semibold uppercase hover:bg-white hover:text-indigo-600 transition">
                  Login
                </button>
              </div>
              <div className={`w-1/2 flex flex-col items-center justify-center p-10 text-center transition-all duration-700 ${isSignUp ? 'translate-x-[20%]' : 'translate-x-0'}`}>
                <h1 className="text-3xl font-bold mb-4">Hello, Welcome!</h1>
                <p className="mb-8">Don't have an account?</p>
                <button onClick={() => setIsSignUp(true)} className="border-2 border-white px-12 py-3 rounded-lg font-semibold uppercase hover:bg-white hover:text-indigo-600 transition">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;