require('dotenv').config();  // Load environment variables from .env
const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Mongo URI:', process.env.MONGO_URI);  // Check if URI is loaded correctly

// MongoDB connection setup
const uri = process.env.MONGO_URI; // MongoDB URI from .env file
const client = new MongoClient(uri);
let db;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB and set up the database
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB!');
        db = client.db('contactDB'); // Use or create a database named 'contactDB'
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

// Route for saving messages from the contact form
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation for required fields
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const messagesCollection = db.collection('messages'); // Access 'messages' collection
        const newMessage = { name, email, message, timestamp: new Date() };

        // Insert the new message into the database
        await messagesCollection.insertOne(newMessage);
        res.status(200).json({ message: 'Message saved successfully' });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ message: 'Error saving message', error: error.message });
    }
});

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Contact Page API');
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Connect to MongoDB
connectToDatabase();
