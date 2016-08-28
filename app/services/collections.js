const NeDB = require('nedb');

const collections = {
    todos: new NeDB()
};

module.exports = collections;