const projectsDb = require("../db-config.js");
const tasksDb = require("../db-config.js");
const resourcesDb = require("../db-config");

// above the fold
module.exports = {
    get,
    getById,
    findResources,
    findTasks,
    addTasks,
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

function findResources(id) {
    return resourcesDb('projects_resources').where({ project_id: id})
        .then((projectResources) => {
            let promises = [];
            projectResources.map(projectResource => {
                promises.push(resourcesDb('resources').where({id: projectResource.resource_id}))
            })
            return Promise.all(promises);
        })
        // .then(resources => {
        //     return resources;
        // })
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
                return tasksDb('tasks').where({ project_id: id })
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

function addTasks() {
    const task = req.body;
    // return getById(id)
    //     .then(project => {
    //         if(project) {
                tasksDb('tasks')
                .insert(task)
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

