const mongoose = require('mongoose');

// Define the login schema
const LoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
}, {
  timestamps: true,
});

// Export the model
const LoginModel = mongoose.model('Login', LoginSchema);
module.exports = LoginModel;
