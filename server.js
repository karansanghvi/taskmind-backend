const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const signupRoute = require('./routes/signupRoute');
const loginRoute = require('./routes/loginRoute');

const app = express();

// Middleware

// Configure CORS to allow specific origins
app.use(cors({
  origin: 'http://localhost:3000',  
  methods: ['GET', 'POST'],         
  credentials: true                 
}));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://karansanghvi1303:En9HSsuNlCLTYANj@task-mind-db.cckr6.mongodb.net/?retryWrites=true&w=majority&appName=task-mind-db');

// Use the signup route
app.use('/api', signupRoute); 
app.use('/api', loginRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
