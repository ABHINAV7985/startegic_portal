const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');


const app = express();
const PORT = 3000;

// MongoDB connection
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let db;

// Middleware
app.use(express.json());
// Middleware
app.use(cors());

// Connect to MongoDB and set up the database
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB!');
        db = client.db('loginApp'); // Use or create a database named 'loginApp'
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

// Routes
app.post('/login', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const usersCollection = db.collection('users'); // Access 'users' collection
        const newUser = { username, email, password };

        // Check if the user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Insert new user
        await usersCollection.insertOne(newUser);
        res.status(200).json({ message: 'User saved successfully' });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Error saving user', error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to the Login Page API');
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Connect to MongoDB
connectToDatabase();
