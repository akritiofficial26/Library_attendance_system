import React, { useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Register from './Register';
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/admin-login",
        {
          email: formData.email,
          password: formData.password
        }
      );

      alert("Login Successful");
      navigate("/dashboard"); 
      console.log(response.data);

    } catch (error) {

      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert("Server Error");
      }

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 font-sans">
      <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className={`absolute top-0 w-1/2 h-full transition-all duration-700 ease-in-out z-10 ${isSignUp ? 'translate-x-full' : 'translate-x-0'}`}>

          <div className={`absolute inset-0 flex flex-col items-center justify-center p-10 h-full w-full transition-all duration-700 ${isSignUp ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
            
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Login</h1>

            <span className="text-red-500 text-sm mb-4">
              or login with gmail
            </span> 

            <form onSubmit={handleSubmit} className="w-full">

              <InputGroup 
                icon={faUser} 
                placeholder="Email" 
                type="email"
                name="email"
                onChange={handleChange}
              />

              <InputGroup 
                icon={faLock} 
                placeholder="Password" 
                type="password"
                name="password"
                onChange={handleChange}
              />

              <div className="w-full text-right">
                <a href="#" className="text-sm text-indigo-500 hover:underline">
                  Forgot Password?
                </a>
              </div>
              
              <button 
                type="submit"
                className="mt-6 bg-indigo-600 text-white px-12 py-3 rounded-lg font-semibold uppercase tracking-wider hover:bg-indigo-700 transition w-full"
              >
                Login
              </button>

            </form>

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


           // Reusable Input Component //
const InputGroup = ({ icon, placeholder, type, name, onChange }) => (
  <div className="relative w-full mb-4">

    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
      <FontAwesomeIcon icon={icon} />
    </div>

    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required
      onChange={onChange}
      className="block w-full pl-10 pr-3 py-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
    />

  </div>
);

export default Login;