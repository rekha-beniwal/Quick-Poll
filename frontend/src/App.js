// frontend/src/App.js
import React, { useState } from 'react';
import PollList from './components/PollList';
import CreatePoll from './components/CreatePoll';
import PollDetail from './components/PollDetail';
import './index.css';


function App() {
  const [view, setView] = useState('list'); // 'list', 'create', 'detail'
  const [selectedPollId, setSelectedPollId] = useState(null);

  const goToList = () => { setView('list'); setSelectedPollId(null); }
  const goToCreate = () => { setView('create'); setSelectedPollId(null); }
  const goToDetail = (pollId) => { setView('detail'); setSelectedPollId(pollId); }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 to-red-500 flex flex-col">
      <header className="bg-white/90 backdrop-blur-md shadow-md rounded-b-lg p-4 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-800">Quick Polling App</h1>
        <div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg mr-4 transition duration-300"
            onClick={goToList}
          >
            Polls
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
            onClick={goToCreate}
          >
            Create Poll
          </button>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 ">
        {view === 'list' && <PollList onSelectPoll={goToDetail} />}
        {view === 'create' && <CreatePoll onPollCreated={goToList} />}
        {view === 'detail' && selectedPollId && <PollDetail pollId={selectedPollId} />}
      </main>
      <footer className="bg-white/80 backdrop-blur-md shadow-inner p-4 text-center mt-8">
        <p className="text-gray-700">&copy; {new Date().getFullYear()} Quick Polling App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
