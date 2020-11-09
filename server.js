const express = require('express');
const server = express();
server.use(express.json());

const actionRouter = require('./data/helpers/actionRouter');
const projectRouter = require('./data/helpers/projectRouter');


server.use('/api/actions', logger, actionRouter)
server.use('/api/projects', logger, projectRouter)

server.get('/', logger, (req, res) => {
    res.send('<h2>Welcome to the API</h2>')
})

function logger(req, res, next) {
    console.log(`${req.method} request made to ${req.orginalUrl}`)
    next();
}

module.exports = server;

