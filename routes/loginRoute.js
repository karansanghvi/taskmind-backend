const express = require('express');
const SignupModel = require('../models/signupModel'); // Use SignupModel for login as well
const router = express.Router();

// Login route handler
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await SignupModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Logged In Successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Account Not Created. Signup.' });
  }
});

module.exports = router;
