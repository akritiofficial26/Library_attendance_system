
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 h-full w-full">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Registration</h1>
      <InputGroup icon={faUser} placeholder="Username" type="text" />
      <InputGroup icon={faEnvelope} placeholder="Email" type="email" />
      <InputGroup icon={faLock} placeholder="Password" type="password" />
      
      <button className="mt-6 bg-indigo-600 text-white px-12 py-3 rounded-lg font-semibold uppercase tracking-wider hover:bg-indigo-700 transition w-full">
        Register
      </button>
      
      <span className="text-gray-500 text-sm mt-4 mb-2">or register with social platforms</span>
      <div className="flex space-x-3">
        <SocialIcon icon={faGoogle} />
        <SocialIcon icon={faFacebookF} />
        <SocialIcon icon={faGithub} />
        <SocialIcon icon={faLinkedinIn} />
      </div>
    </div>
  );
};

const InputGroup = ({ icon, placeholder, type }) => (
  <div className="relative w-full mb-4">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
      <FontAwesomeIcon icon={icon} />
    </div>
    <input
      type={type}
      placeholder={placeholder}
      className="block w-full pl-10 pr-3 py-3 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
    />
  </div>
);

const SocialIcon = ({ icon }) => (
  <div className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
    <FontAwesomeIcon icon={icon} className="text-gray-700" />
  </div>
);

export default Register;