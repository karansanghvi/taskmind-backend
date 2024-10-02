const express = require('express');
const SignupModel = require('../models/signupModel');  // Import the signup model
const router = express.Router();

// Signup route handler
router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const newUser = new SignupModel({
      fullName,
      email,
      password,  // You should hash the password before saving (e.g., using bcrypt)
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Error registering user' });
    }
  }
});

module.exports = router;
