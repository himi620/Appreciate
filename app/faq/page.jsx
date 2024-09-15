"use client";

import React, { useEffect, useState } from "react";

const FAQ = () => {
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({ title: "", content: "", image: null });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch('/api/faqs');
        if (!response.ok) {
          throw new Error("Failed to fetch FAQs");
        }
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFAQs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', formData.content);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await fetch('/api/faqs', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error.message);
        throw new Error(error.message || "Failed to create FAQ");
      }

      const data = await response.json();
      setCards([...cards, data]);
      resetForm();
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", image: null });
    setShowForm(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleDeleteCard = async (id) => {
    try {
      const response = await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error("Failed to delete FAQ");
      }
      setCards(cards.filter((card) => card._id !== id));
    } catch (error) {
      console.error("Error deleting the card:", error);
    }
  };

  const handleEditCard = (card) => {
    setIsEditing(true);
    setEditingId(card._id);
    setFormData({ title: card.title, content: card.content, image: null });
    setShowForm(true);
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 bg-gradient-to-r from-blue-200 to-purple-200 w-full mx-auto">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center">FAQ Section</h2>

      <button
        className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg mb-4 transition-colors duration-300 hover:bg-blue-600"
        onClick={() => setShowForm(!showForm)}
      >
        {isEditing ? "Edit Card" : "Create Card"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 text-black">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="title">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="content">
              Content:
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="image">
              Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-green-600"
          >
            {isEditing ? "Update Card" : "Create Card"}
          </button>
        </form>
      )}

      {cards.map((card) => (
        <div
          key={card._id}
          className="flex flex-col sm:flex-row items-start sm:items-center bg-white rounded-lg shadow-lg p-4 mb-4 transition-transform duration-300 hover:scale-105"
        >
          <div className="w-full sm:w-1/4 flex-shrink-0 mb-4 sm:mb-0">
            {card.image && <img src={card.image} alt={card.title} className="w-full h-auto rounded-lg" />}
          </div>
          <div className="ml-0 sm:ml-4 w-full sm:w-3/4">
            <h3 className="text-lg sm:text-xl font-semibold text-red-500 mb-2">{card.title}</h3>
            <p className="text-gray-700 mb-4">{card.content}</p>
            <div className="flex flex-wrap">
              <button
                onClick={() => handleEditCard(card)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2 transition-colors duration-300 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCard(card._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg transition-colors duration-300 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
