const express = require('express');
const Task = require('../models/taskModel');
const jwt = require('jsonwebtoken');

const router = express.Router();

// middleware to get user from token
const getUserFromToken = (req) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token) return null;

    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
        return null;
    }
};

// get all tasks
router.get('/tasks', async (req, res) => {
    const userId = getUserFromToken(req)?.id;
    try {
        const tasks = await Task.find({ user: userId });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// add a task
router.post('/tasks', async (req, res) => {
    const userId = getUserFromToken(req)?.id;
    const task = new Task({
        title: req.body.title,
        completed: false,
        user: userId,
    });

    try {
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// delete a task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).send('Task not found');
        res.status(200).json({
            message: 'Task deleted'
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Update a task status
router.patch('/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { completed: req.body.completed },
            { new: true }
        );

        if (!updatedTask) return res.status(404).send('Task not found');
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;