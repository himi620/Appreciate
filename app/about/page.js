import React from 'react';


const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-300 to-blue-200 flex flex-col justify-center items-center">
     
      <div className="flex space-x-6 mb-10">
       
        <div className="blur-lg bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-16 h-16"></div>
        <div className="blur-lg bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-16 h-16"></div>
        <div className="blur-md bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-16 h-16 border-4 border-pink-400"></div>
        <div className="blur-lg bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-16 h-16"></div>
      </div>

      <div className="bg-white rounded-t-3xl px-6 py-8 w-full max-w-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Fruit.Ai</h1>
        <p className="text-gray-500 text-lg mb-6">
          Whether you're looking to discover new fruits, understand their nutritional values, or find the perfect fruit for your diet, our AI-driven chatbot is here to assist. We provide personalized fruit recommendations tailored to your health needs, making it easier for you to integrate the best fruits into your daily routine.
        </p>
        <button className="bg-black text-white text-lg font-semibold px-6 py-2 rounded-full">ABOUT</button>
      </div>
    </div>
  );
};

export default About;
