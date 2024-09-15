import React from 'react';
import Link from 'next/link'; 

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 to-blue-200 flex flex-col justify-center items-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white">Fruit.Ai</h1>
        <p className="text-white text-lg mt-2">"Be Healthy!"</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
      
      <Link href="/chat">
        <div className="flex justify-center items-center h-40 w-40 rounded-xl bg-yellow-200 shadow-lg hover:shadow-xl transition-shadow">
        <span className="text-3xl font-bold text-purple-600">Chat.</span>
        </div>
      </Link>

        <Link href="/translate">
        <div className="flex justify-center items-center h-40 w-40 rounded-xl bg-green-200 shadow-lg hover:shadow-xl transition-shadow">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Google_Translate_logo.svg/600px-Google_Translate_logo.svg.png" alt="Google Translate" className="w-16 h-16" />
        </div>
        </Link>
        
        <Link href="/faq">
        <div className="flex justify-center items-center h-40 w-40 rounded-xl bg-purple-200 shadow-lg hover:shadow-xl transition-shadow">
          <span className="text-3xl font-bold text-blue-700">FAQs</span>
        </div>
        </Link>


        <Link href="/about"> 
          <div className="flex justify-center items-center h-40 w-40 rounded-xl bg-pink-200 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <span className="text-3xl font-bold text-purple-600">About</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;