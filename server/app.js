const express = require('express');
const bodyParser = require('body-parser');

const setAuth = require('./middleware/auth-middleware').setAuth;

// initialize our express app
const app = express();

config = require('./config');

require('./database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(setAuth);

require('./routes')(app);

app.listen(config.port, () => {
    console.log('Server is up and running on port number ' + config.port);
});

// for testing 
module.exports = app;