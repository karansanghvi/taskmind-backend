const express = require('express');
const Notes = require('../models/notesModel');
const jwt = require('jsonwebtoken');

const router = express.Router();

// middleware to get user from token
const getUserFromToken = (req) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return null;

    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
        return null;
    }
};

// get all notes
router.get('/notes', async (req, res) => {
    const userId = getUserFromToken(req)?.id;
    try {
        const notes = await Notes.find({ user: userId });
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// add notes
router.post('/notes', async (req, res) => {
    const userId = getUserFromToken(req)?.id;
    const note = new Notes({
        title: req.body.title,
        description: req.body.description, 
        user: userId,
    });

    try {
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// delete notes
router.delete('/notes/:id', async (req, res) => {
    try {
        const deletedNote = await Notes.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).send('Note not found');
        res.status(200).json({ message: 'Note deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// update notes
router.put('/notes/:id', async(req, res) => {
    const { title, description } = req.body;
    try {
        const updatedNote = await Notes.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
        if (!updatedNote) return res.status(404).send('Note not found');
        res.status(200).json(updatedNote);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
