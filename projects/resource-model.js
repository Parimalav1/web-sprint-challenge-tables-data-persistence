const resourcesDb = require('../db-config.js');
const projectsDb = require('../db-config.js');
const { returning } = require("../db-config.js");

// above the fold
module.exports = {
    get,
    getById,
    findProjects,
    addResource,
    update,
    remove
};

function get(id) {
    return resourcesDb('resources');
};

function getById(id) {
    return resourcesDb('resources').where({ id }).first();
};

function findProjects(id) {
    return projectsDb('projects_resources').where({resource_id: id})
        .then((resourceProjects) => {
            let promises = [];
            resourceProjects.map(resourceProject => {
                promises.push(projectsDb('projects').where({id: resourceProject.project_id}));
            })
            return Promise.all(promises);
        })
};

function addResource(resource) {
    return (
        resourcesDb('resources')
            .insert(resource)
            // .returning("id")
            .then(ids => {
                const id = ids[0];

                return getById(id);
            })
    );
};

function update(id, changes) {
    return resourcesDb("resources")
        .where({ id })
        .update(changes)
        .then((count) => {
            return getById(id);
        });
};

function remove(id) {
    return resourcesDb("resources").where({ id }).del();
};

