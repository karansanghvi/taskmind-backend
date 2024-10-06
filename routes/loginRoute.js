const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const SignupModel = require('../models/signupModel'); 
const router = express.Router();

dotenv.config();

// Login route handler
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await SignupModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Use bcrypt to compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({
      token,
      fullName: user.fullName,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ error: 'Account Not Created. Signup.' });
  }
});

module.exports = router;
