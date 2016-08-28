// set /src as src dir
require('app-module-path').addPath(__dirname + '/app');

const app = require('app');

const PORT = 3000;

app.listen(PORT, function () {
    console.log(`zy-todo-server listening on port ${PORT}`);
});