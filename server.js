const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// declare dotenv
dotenv.config();

// Import routes
const signupRoute = require('./routes/signupRoute');
const loginRoute = require('./routes/loginRoute');
const profileRoute = require('./routes/profileRoute');
const taskRoute = require('./routes/taskRoute');
const notesRoute = require('./routes/notesRoute');

const app = express();

// Configure CORS to allow specific origins
app.use(cors({
  origin: 'http://localhost:3000',  
  methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],         
  credentials: true                 
}));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error: ', err));

// use imported routes
app.use('/api', signupRoute); 
app.use('/api', loginRoute);
app.use('/api', profileRoute);
app.use('/api', taskRoute);
app.use('/api', notesRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
