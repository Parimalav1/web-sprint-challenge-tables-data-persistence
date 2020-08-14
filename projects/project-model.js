const projectsDb = require("../db-config.js");
const TasksDb = require("../db-config.js");

// above the fold
module.exports = {
    get,
    getById,
    findTasks,
    addProject,
    update,
    remove
};

// implementation
function get() {
    return projectsDb("projects");
};

function getById(id) {
    return projectsDb('projects').where({ id }).first();
};

function addProjectInfo2Task(task, project_name, project_description) {
    return{
         ...task, project_name, project_description
    }
};

function findTasks(id) {
    return getById(id)
        .then(project => {
            if (project) {
                return TasksDb('tasks').where({ project_id: id })
                    .then(tasks => {
                        return tasks.map(x => addProjectInfo2Task(x, project.name, project.description))
                    })
            } else {
                return null;
            }
        })

};

function addProject(project) {
    return (
        projectsDb('projects')
            .insert(project)
            // .returning("id")
            .then(ids => {
                const id = ids[0];

                return getById(id);
            })
    );
};

function update(id, changes) {
    return projectsDb("projects")
        .where({ id })
        .update(changes)
        .then((count) => {
            return getById(id);
        });
};

function remove(id) {
    return projectsDb("projects").where({ id }).del();
};

