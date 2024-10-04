const express = require('express');
const SignupModel = require('../models/signupModel');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// get user profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await SignupModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }
        res.status(200).json({
            fullName: user.fullName,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error retrieving user detials'
        });
    }
});

module.exports = router;