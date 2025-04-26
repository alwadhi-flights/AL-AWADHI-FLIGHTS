const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (index.html, CSS, JS)
app.use(express.static('public'));

// Your other routes for fetching live flight data
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
