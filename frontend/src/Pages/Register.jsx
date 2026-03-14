import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.password !== formData.confirmPassword){
      alert("Passwords do not match");
      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/admin-register",
        {
          name: formData.username,
          email: formData.email,
          password: formData.password
        }
      );

      alert("Registration Successful");
      console.log(response.data);
      navigate("/login");

    } catch(error) {

      if(error.response){
        alert(error.response.data.error);
      } else {
        alert("Server Error");
      }

    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 h-full w-full">
      
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Registration
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md">

        <InputGroup 
          icon={faUser} 
          placeholder="Username" 
          type="text"
          name="username"
          onChange={handleChange}
        />

        <InputGroup 
          icon={faEnvelope} 
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

        <InputGroup 
          icon={faLock} 
          placeholder="Confirm Password" 
          type="password"
          name="confirmPassword"
          onChange={handleChange}
        />

        <button 
          type="submit"
          className="mt-4 bg-indigo-600 text-white px-12 py-3 rounded-lg font-semibold uppercase tracking-wider hover:bg-indigo-700 transition w-full"
        >
          Register
        </button>

      </form>

      <span className="text-red-500 text-sm mt-4 mb-2">
        or register with gmail
      </span>

    </div>
  );
};

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

export default Register;