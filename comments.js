// Create new web server to listen on port 3000
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');
// Create a new express application
const app = express();
// Add middleware
app.use(bodyParser.json());
app.use(cors());
// Create an empty object to store comments
const commentsByPostId = {};
// Create a route handler for GET requests to /posts/:id/comments
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});
// Create a route handler for POST requests to /posts/:id/comments
app.post('/posts/:id/comments', async (req, res) => {
    // Generate a random id for the comment
    const commentId = randomBytes(4).toString('hex');
    // Get the content from the request body
    const { content } = req.body;
    // Get the comments array for the post id
    const comments = commentsByPostId[req.params.id] || [];
    // Add the new comment to the comments array
    comments.push({ id: commentId, content, status: 'pending' });
    // Update the comments array for the post id
    commentsByPostId[req.params.id] = comments;
    // Send a response to the user
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    });
    res.status(201).send(comments);
});
// Create a route handler for POST requests to /events
app.post('/events', async (req, res) => {
    console.log('Received Event', req.body.type);
    const { type, data } = req.body;
    if (type === 'CommentModerated') {
        const { id, postId, status, content } = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                status,
