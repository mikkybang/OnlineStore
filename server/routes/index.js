const fs = require('fs');

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
                let endpoint = name.substr(0, name.length - 3);
                app.use(`/${endpoint}`, router);
            });
    });
}