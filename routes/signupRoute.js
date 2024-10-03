const express = require('express');
const SignupModel = require('../models/signupModel'); 
const router = express.Router();

// Signup route handler
router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const newUser = new SignupModel({
      fullName,
      email,
      password,  
    });

    console.log('User data: ', newUser);

    await newUser.save();
    res.status(201).json({ message: 'Account Created Successfully' });
  } catch (error) {

    console.log('Error saving user: ', error);

    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Error registering user' });
    }
  }
});

module.exports = router;
