"use client";
import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaPinterestP, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail, MdLock } from 'react-icons/md';
import { RiFingerprintFill } from 'react-icons/ri';
import Link from 'next/link'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log({ email, password, rememberMe });

    window.location.href = "/home";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <p className="text-center text-gray-500 mb-4">
          By signing in you are agreeing to our <a href="#" className="text-blue-600">Terms and privacy policy</a>
        </p>

        <div className="flex justify-center mb-4">
          <button className="mr-4 font-semibold text-blue-600">Login</button>
          <button className="text-gray-400">Register</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              <MdEmail className="inline mr-2 text-xl" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              <MdLock className="inline mr-2 text-xl" />
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="absolute right-4 top-3 cursor-pointer">
                
                
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span className="ml-2 text-gray-700">Remember password</span>
            </label>
            <a href="#" className="text-blue-600">Forget password</a>
          </div>

          <Link href="/home">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </Link>
        </form>

        <p className="text-center my-4">or connect with</p>

        <div className="flex justify-center space-x-4 mb-4">
          <FaFacebookF className="text-blue-600 text-2xl cursor-pointer" />
          <FaInstagram className="text-red-500 text-2xl cursor-pointer" />
          <FaPinterestP className="text-red-600 text-2xl cursor-pointer" />
          <FaLinkedinIn className="text-blue-800 text-2xl cursor-pointer" />
        </div>

        <div className="flex justify-center">
          <RiFingerprintFill className="text-blue-600 text-6xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;