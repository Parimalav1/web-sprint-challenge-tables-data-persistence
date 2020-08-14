const express = require('express');

const Tasks = require('./task-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Tasks.get()
        .then(tasks => {
            res.json(tasks);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get tasks' });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Tasks.getById(id)
        .then(task => {
            if (task) {
                res.json(task);
            } else {
                res.status(404).json({ message: 'Could not find task with given id.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get task' });
        });
});

router.post('/', (req, res) => {
    const taskData = req.body;

    Tasks.addTask(taskData)
        .then(task => {
            res.status(201).json(task);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new task' });
        });
});

module.exports = router;
