const express = require('express');
const path = require('path');
const cors = require('cors'); // Import cors
const { verifyEmail } = require('./index'); // Import verify function

const app = express();
const port = process.env.PORT || 3001; // Server runs on port 3001

// Enable CORS for your React Vite client development server
app.use(cors({
    origin: 'http://localhost:5173' 
}));

app.use(express.json()); // Support JSON-encoded request bodies

// Optional static asset path from old frontend
app.use(express.static(path.join(__dirname, 'public')));

// Verification API endpoint
app.post('/verify', async (req, res) => {
    const { email } = req.body;
    
    // Cleaned up the unexpected escaped token syntax error here
    if (!email) {
        return res.status(400).json({ error: "Please provide an email address." });
    }
    
    try {
        const result = await verifyEmail(email);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error during verification." });
    }
});

app.listen(port, () => {
    console.log(`Server is listening safely on port ${port}`);
});