const express = require('express');

const projectRouter = require('./projects/project-router.js');
const resourceRouter = require('./projects/resource-router.js');
const taskRouter = require('./projects/task-router.js');

const server = express();

server.use(express.json());
server.use('/api/projects', projectRouter);
server.use('/api/resources', resourceRouter);
server.use('/api/tasks', taskRouter);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

// module.exports = server;