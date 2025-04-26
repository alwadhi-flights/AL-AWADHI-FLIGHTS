const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Replace 'YOUR_API_KEY' with your AviationStack API key
const API_KEY = 'YOUR_API_KEY';

app.use(express.static('public'));

app.get('/api/flights', async (req, res) => {
    const { from, to } = req.query;
    try {
        const response = await axios.get(`http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&dep_iata=${from}&arr_iata=${to}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching flight data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});