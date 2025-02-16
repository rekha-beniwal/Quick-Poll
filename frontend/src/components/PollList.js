// frontend/src/components/PollList.js
import React, { useState, useEffect } from 'react';

const PollList = ({ onSelectPoll }) => {
    const [polls, setPolls] = useState([]);
    // Get backend URL from .env file
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const fetchPolls = async () => {
        try {
            const response = await fetch(`${backendUrl}/polls`);
            const data = await response.json();
            setPolls(data);
        } catch (error) {
            console.error("Error fetching polls:", error);
        }
    };

    useEffect(() => {
        fetchPolls();
        const interval = setInterval(fetchPolls, 5000); // auto-refresh every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">
                Available Polls
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {polls.map(poll => (
                    <div
                        key={poll._id}
                        className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl border border-gray-200"
                        onClick={() => onSelectPoll(poll._id)}
                    >
                        <p className="text-xl font-semibold text-gray-800">{poll.question}</p>
                        {/* Display creation date/time */}
                        <p className="text-sm text-gray-500 mt-2">
                            Created on: {new Date(poll.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PollList;
