const tasksDb = require('../db-config.js');
const { returning } = require("../db-config.js");

// above the fold
module.exports = {
    get,
    getById,
    addTask
};

function get(id) {
    return tasksDb('tasks');
};

function getById(id) {
    return tasksDb('tasks').where({ id }).first();
};

function addTask(task) {
    return (
        tasksDb('tasks')
            .insert(task)
            // .returning("id")
            .then(ids => {
                const id = ids[0];

                return getById(id);
            })
    );
};
