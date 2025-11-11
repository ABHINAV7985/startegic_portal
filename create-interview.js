const express = require('express');
const { MongoClient } = require('mongodb');  // Import MongoClient from mongodb
const cors = require('cors');
const app = express();

// MongoDB Connection URI (replace with your actual URI)
const uri = "mongodb://localhost:27017";
const dbName = "mydb"; // Your database name

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB client setup
let db;

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log("Connected to MongoDB");
    db = client.db(dbName); // Set the database reference
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });

// API Route to Create an Interview
app.post('/api/create-interview', (req, res) => {
    // Log the request body to verify data is coming through correctly
    console.log("Received data:", req.body);

    const { role, name, date, time, details } = req.body;

    const interviewsCollection = db.collection('interviews');

    const newInterview = {
        role,
        name,
        date,
        time,
        details
    };

    interviewsCollection.insertOne(newInterview)
        .then(result => {
            console.log("Inserted interview:", result);
            res.status(200).json({ success: true, message: 'Interview will be scheduled soon!' });
        })
        .catch(err => {
            console.error('Error inserting interview:', err);
            res.status(500).json({ success: false, message: 'Error creating interview.' });
        });
});

// Start the server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
