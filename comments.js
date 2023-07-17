// Create new web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON
app.use(bodyParser.json());

// Use static files
app.use(express.static('public'));

// Import routes
const comments = require('./routes/comments');
app.use(comments);

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});




