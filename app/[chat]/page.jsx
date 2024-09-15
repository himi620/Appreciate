import React from 'react';
import Link from 'next/link'; 

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-white">
      <div className="text-center">
        <div className="text-3xl text-gray-500">
          ...
        </div>
        <h1 className="text-5xl font-bold text-gray-800">Hello</h1>
        <h2 className="text-5xl font-bold text-purple-500">Chat.</h2>
        <p className="text-lg text-gray-500">
          The last chat app you’ll ever need.
        </p>
      </div>
  
      <Link href="/chat/order">
        <button className="mt-4 px-6 py-2 border-2 border-purple-500 text-purple-500 rounded-lg transition-colors duration-300 hover:bg-purple-500 hover:text-white">
          Start Chatting...
        </button>
      </Link>
    </div>
  );
}

export default App;
