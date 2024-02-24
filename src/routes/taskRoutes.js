    const express = require('express');
    const Task = require('../models/tasks');

    const router = express.Router();




    // Create a task
    router.post('/tasks', (req, res) => {
        const task = req.body;
        Task.create(task, (err) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send(task);
            }
        });
    });

    // Get all tasks
    router.get('/tasks', (req, res) => {
        Task.getAll((err, tasks) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(tasks);
            }
        });
    });

    // Get a task by ID
    router.get('/tasks/:id', (req, res) => {
        const id = req.params.id;
        Task.getById(id, (err, task) => {
            if (err) {
                res.status(500).send(err);
            } else if (!task) {
                res.status(404).send();
            } else {
                res.send(task);
            }
        });
    });

    // Update a task by ID
    router.patch('/tasks/:id', (req, res) => {
        const id = req.params.id;
        const updates = req.body;
        Task.updateById(id, updates, (err, task) => {
            if (err) {
                res.status(400).send(err);
            } else if (!task) {
                res.status(404).send();
            } else {
                res.send(task);
            }
        });
    });

    // Delete a task by ID
    router.delete('/tasks/:id', (req, res) => {
        const id = req.params.id;
        Task.deleteById(id, (err, task) => {
            if (err) {
                res.status(500).send(err);
            } else if (!task) {
                res.status(404).send();
            } else {
                res.send(task);
                console.log(task);
            }
        });
    });

    // Update the status of a task by ID
    router.patch('/tasks/:id/update-status', (req, res) => {
        const id = req.params.id;
        const completed = req.body.completed;
        Task.updateStatusById(id, completed, (err, task) => {
            if (err) {
                res.status(400).send(err);
            } else if (!task) {
                res.status(404).send();
            } else {
                res.send(task);
            }
        });
    });

    module.exports = router;
