
## **📌 Project Overview**  
The **Quick Polling App** is a full-stack web application that allows users to create polls, vote on them, and view real-time results. The frontend is built using **React & Tailwind CSS**, and the backend is powered by **Node.js, Express, and MongoDB**.  

---

## **🚀 Features**  
✔ **Create Polls** – Users can create polls with multiple options.  
✔ **Vote on Polls** – Users can vote on any available poll.  
✔ **Real-Time Updates** – The frontend auto-refreshes every 5 seconds to show updated poll results.  
✔ **Backend API** – Secure API endpoints handle poll creation, retrieval, and voting.  
✔ **Environment Variables** – The frontend fetches the backend URL from a `.env` file for easy configuration.  

---

## **🛠️ Tech Stack**  
### **Frontend:**  
- React.js  
- Tailwind CSS  
- Axios  

### **Backend:**  
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- dotenv  

---

## **📡 API Endpoints**  

### **Poll Endpoints**
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/polls` | Create a new poll |
| **GET** | `/polls` | Get all polls |
| **GET** | `/polls/:id` | Get a single poll by ID |
| **POST** | `/polls/:id/vote` | Vote for an option in a poll |

### **API Examples**  
#### **Create a Poll**  
**Request:**  
```json
POST /polls
Content-Type: application/json
{
  "question": "What's your favorite programming language?",
  "options": ["JavaScript", "Python", "Java"]
}
```
**Response:**  
```json
{
  "_id": "12345",
  "question": "What's your favorite programming language?",
  "options": [
    { "text": "JavaScript", "votes": 0 },
    { "text": "Python", "votes": 0 },
    { "text": "Java", "votes": 0 }
  ],
  "createdAt": "2025-02-16T10:00:00.000Z"
}
```

#### **Vote on a Poll**  
**Request:**  
```json
POST /polls/12345/vote
Content-Type: application/json
{
  "optionIndex": 1
}
```
**Response:**  
```json
{
  "_id": "12345",
  "question": "What's your favorite programming language?",
  "options": [
    { "text": "JavaScript", "votes": 0 },
    { "text": "Python", "votes": 1 },
    { "text": "Java", "votes": 0 }
  ]
}
```

---

## **🗄️ Database Schema (MongoDB)**  
We use **Mongoose** to define our schema:

```js
const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ text: String, votes: { type: Number, default: 0 } }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Poll", pollSchema);
```

### **Poll Document Example**
```json
{
  "_id": "12345",
  "question": "What's your favorite color?",
  "options": [
    { "text": "Red", "votes": 10 },
    { "text": "Blue", "votes": 5 },
    { "text": "Green", "votes": 3 }
  ],
  "createdAt": "2025-02-16T10:00:00.000Z"
}
```

## **🎯 Future Improvements**  
🔹 **User Authentication** – Restrict poll creation and voting to logged-in users.  
🔹 **Real-Time WebSockets** – Use **Socket.io** instead of polling every 5 seconds.  
🔹 **Poll Expiration** – Allow polls to expire after a set time.  

---

## **🤝 Contributing**  
Feel free to submit pull requests or report issues. 🚀  
