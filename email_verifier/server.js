const express = require('express');
const path = require('path');
const { verifyEmail } = require('./index');

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Verification endpoint
app.post('/verify', async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: "Please provide an email address." });
    }

    try {
        const result = await verifyEmail(email);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal server error during verification." });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});