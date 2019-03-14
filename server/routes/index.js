const fs = require('fs');
const errorHandlers = require('../middleware/error-handlers');

const resourceNotFoundHandler = errorHandlers.resource_not_found;

module.exports = (app) => {
    const routesFolder = 'routes/';
    fs.readdir(routesFolder,
         { 
            withFileTypes: true 
        }, 
         (err, files) => {
            files.forEach(file => {
                if (file.isDirectory()) return;
                let name = file.name;
                if (!name.endsWith(".js")) return;
                if (name === "index.js") return;
                let router = require("./"+name);
                // define global error handling here
                router.use(resourceNotFoundHandler);
                let endpoint = name.substr(0, name.length - 3);
                app.use(`/${endpoint}`, router);
            });
    });
}