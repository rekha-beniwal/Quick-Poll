// backend/routes/polls.js
const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');

// Create a new poll
router.post('/', async (req, res) => {
  try {
    const { question, options } = req.body;
    if (!question || !options || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ error: 'Invalid poll data. Provide a question and at least two options.' });
    }
    const formattedOptions = options.map(option => ({ text: option, votes: 0 }));
    const poll = new Poll({ question, options: formattedOptions });
    await poll.save();
    res.status(201).json(poll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all polls
router.get('/', async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 });
    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific poll
router.get('/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ error: 'Poll not found' });
    res.json(poll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Vote on a poll (one vote per IP)
router.post('/:id/vote', async (req, res) => {
  try {
    const { optionIndex } = req.body;
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ error: 'Poll not found' });

    // Use req.ip to get the voter's IP address
    const voterIP = req.ip;
    if (poll.votedIPs.includes(voterIP)) {
      return res.status(403).json({ error: 'You have already voted on this poll.' });
    }

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ error: 'Invalid option index' });
    }

    // Increment the vote count and record the voter's IP
    poll.options[optionIndex].votes += 1;
    poll.votedIPs.push(voterIP);
    await poll.save();

    res.json(poll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
