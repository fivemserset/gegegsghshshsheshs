// Import necessary packages
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Initialize the express app
const app = express();
const port = process.env.PORT || 5000; // Heroku sets a port, or fallback to 5000 for local development

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// API Key for OSINTCat
const apiKey = "yIrCqD29ZFb3S3IJ63t4_GKFfGrN6tkWjU6cPse6W4k"; // Replace with your own API key

// Define the search route
app.get('/search', async (req, res) => {
    const { term, type } = req.query; // Get query parameters: term (search term) and type (query type)

    if (!term || !type) {
        return res.status(400).json({ error: "Please provide both 'term' and 'type' parameters." });
    }

    try {
        // Construct the OSINTCat API URL
        const osintCatUrl = `https://osintcat.com/search?term=${encodeURIComponent(term)}&type=${encodeURIComponent(type)}&api_key=${apiKey}`;
        
        // Make the API call to OSINTCat using Axios
        const response = await axios.get(osintCatUrl);

        // Check if we get a valid response from the OSINTCat API
        if (response.data && response.data.results) {
            return res.json({ results: response.data.results });
        } else {
            return res.status(404).json({ error: "No results found." });
        }
    } catch (error) {
        // Catch any errors during the API request
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: "Error fetching data from OSINTCat." });
    }
});

// Serve the app
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
