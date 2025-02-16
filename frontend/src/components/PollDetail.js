// frontend/src/components/PollDetail.js
import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Make sure to install react-icons: npm install react-icons

const PollDetail = ({ pollId }) => {
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [votedOption, setVotedOption] = useState(null);

  // Helper: get voted option from localStorage
  const getVotedOption = () => {
    return localStorage.getItem(`voted_${pollId}`);
  };
 // Get backend URL from .env file
 const backendUrl = process.env.REACT_APP_BACKEND_URL;
 
  // Helper: save voted option in localStorage
  const saveVotedOption = (optionIndex) => {
    localStorage.setItem(`voted_${pollId}`, optionIndex);
  };

  const fetchPoll = async () => {
    try {
      const response = await fetch(`${backendUrl}/polls/${pollId}`);
      const data = await response.json();
      setPoll(data);
    } catch (error) {
      console.error("Error fetching poll:", error);
    }
  };

  const handleVote = async () => {
    if (selectedOption === null) {
      alert("Please select an option to vote.");
      return;
    }
    try {
      const response = await fetch(`${backendUrl}/polls/${pollId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionIndex: selectedOption })
      });
      if (response.ok) {
        // Save voted option so we can mark it later
        saveVotedOption(selectedOption);
        setVotedOption(selectedOption);
        fetchPoll();
      } else {
        const err = await response.json();
        alert(err.error || "Error voting");
      }
    } catch (error) {
      console.error("Vote error:", error);
    }
  };

  useEffect(() => {
    fetchPoll();
    // Check if there's a voted option stored in localStorage for this poll
    const storedVote = getVotedOption();
    if (storedVote !== null) {
      setVotedOption(parseInt(storedVote, 10));
    }
    const interval = setInterval(fetchPoll, 5000); // auto-refresh every 5 seconds
    return () => clearInterval(interval);
  }, [pollId]);

  if (!poll) return <p>Loading poll...</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{poll.question}</h2>
      <div className="space-y-3">
        {poll.options.map((option, index) => (
          <div key={index} className="flex items-center p-3 border rounded-md hover:bg-gray-50">
            <input
              type="radio"
              name="option"
              value={index}
              disabled={votedOption !== null} // disable if already voted
              checked={selectedOption === index}
              onChange={() => setSelectedOption(index)}
              className="mr-3"
            />
            <span className="flex-1 text-lg">{option.text}</span>
            <span className="text-sm text-gray-600 mr-2"> [ {option.votes} votes ]</span>
            {votedOption === index && (
              <FaCheckCircle className="text-blue-500" title="Your Vote" />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleVote}
        disabled={votedOption !== null}  // disable button if already voted
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md transition duration-300 hover:bg-blue-700 disabled:opacity-50"
      >
        {votedOption !== null ? 'Voted' : 'Vote'}
      </button>
    </div>
  );
};

export default PollDetail;
