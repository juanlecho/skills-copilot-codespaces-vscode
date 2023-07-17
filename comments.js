// Create new web server
const express = require('express');
const app = express();
// Import comments data
const comments = require('./data/comments');

// Set up server port
const port = 3000;

// Set up route for comments data
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Set up route for comments data by id
app.get('/comments/:id', (req, res) => {
    // Find comment by id
    const found = comments.some(comment => comment.id === parseInt(req.params.id));
    if (found) {
        res.json(comments.filter(comment => comment.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
    }
});

// Set up server port to listen for request
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});