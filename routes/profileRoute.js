const express = require('express');
const SignupModel = require('../models/signupModel');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await SignupModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      fullName: user.fullName,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving user details' });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  const { fullName, email } = req.body;
  try {
    const updatedUser = await SignupModel.findByIdAndUpdate(
      req.user.id,
      { fullName, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      fullName: updatedUser.fullName,
      email: updatedUser.email,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile' });
  }
});

module.exports = router;
