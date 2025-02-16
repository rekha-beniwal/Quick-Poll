// frontend/src/components/CreatePoll.js
import React, { useState } from 'react';

const CreatePoll = ({ onPollCreated }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']); // start with 2 options

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };
 // Get backend URL from .env file
 const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Filter out empty options
    const filteredOptions = options.filter(opt => opt.trim() !== '');
    if (!question.trim() || filteredOptions.length < 2) {
      alert("Please provide a question and at least two options.");
      return;
    }
    try {
      const response = await fetch(`${backendUrl}/polls`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, options: filteredOptions })
      });
      if (response.ok) {
        onPollCreated();
      } else {
        alert("Error creating poll");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-purple-400 to-blue-500 rounded-xl shadow-2xl border-4 border-white">
      <h2 className="text-4xl font-extrabold text-white mb-6 text-center">Create a New Poll</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-2xl font-semibold mb-2 text-yellow-200">Question:</label>
          <input 
            type="text" 
            className="w-full p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300" 
            value={question} 
            onChange={e => setQuestion(e.target.value)} 
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-2xl font-semibold mb-2 text-yellow-200">Options:</label>
          {options.map((option, index) => (
            <input 
              key={index} 
              type="text" 
              className="w-full p-3 mb-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300" 
              value={option} 
              onChange={e => handleOptionChange(index, e.target.value)}
              required
            />
          ))}
          <button 
            type="button" 
            onClick={addOption} 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition duration-300"
          >
            Add Option
          </button>
        </div>
        <button 
          type="submit" 
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
        >
          Create Poll
        </button>
      </form>
    </div>
  );
};

export default CreatePoll;
