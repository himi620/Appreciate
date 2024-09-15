"use client"

import { useState, useEffect, useRef } from "react";

export default function ChatWithOrders() {
  const [orders, setOrders] = useState([
    { item: "Orange", price: 8.00, quantity: 2, total: 16.00, image: "/assets/fes.jpg" },
    { item: "Cucumber", price: 11.76, quantity: 1, total: 11.76, image: "/assets/fruit.jpg" },
    { item: "Tangerine", price: 6.40, quantity: 3, total: 25.60, image: "/assets/fruity.png" },

  ]);

  const [messages, setMessages] = useState([
    "To confirm it send 'Yes' to me and you can edit also"
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages(prevMessages => [...prevMessages, inputMessage]);
      setInputMessage(""); 
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const updateQuantity = (index, delta) => {
    setOrders(prevOrders => {
      const updatedOrders = [...prevOrders];
      const newQuantity = updatedOrders[index].quantity + delta;

   
      if (newQuantity >= 0) {
        updatedOrders[index].quantity = newQuantity;
        updatedOrders[index].total = (updatedOrders[index].price * newQuantity).toFixed(2);
      }

      return updatedOrders;
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-grow p-4 overflow-auto">
        <div className="bg-white rounded-lg p-4 mt-4">
          {orders.map((order, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <img src={order.image} alt={order.item} className="w-10 h-10 rounded-full"/>
              <div className="text-black">{order.item}</div>
              <div className="text-black">${order.price.toFixed(2)}</div>
              <div className="flex items-center">
                <button 
                  onClick={() => updateQuantity(index, -1)} 
                  className="bg-red-500 text-white px-2 rounded-lg"
                >
                  -
                </button>
                <span className="mx-2 text-black">{order.quantity}</span>
                <button 
                  onClick={() => updateQuantity(index, 1)} 
                  className="bg-green-500 text-white px-2 rounded-lg"
                >
                  +
                </button>
              </div>
              <div className="font-bold text-black">${order.total}</div>
            </div>
          ))}
        </div>

        {messages.map((message, index) => (
          <div key={index} className={`rounded-lg p-2 mb-2 ${index === 0 ? 'bg-white text-black' : (index % 2 === 0 ? 'bg-gray-200' : 'bg-purple-200 text-black text-right')}`}>
            {message}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white p-4 flex">
        <input
          type="text"
          className="flex-grow p-2 rounded-lg border-2 border-gray-300 text-blue-500"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-purple-500 text-white p-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}