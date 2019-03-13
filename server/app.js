const express = require('express');
const bodyParser = require('body-parser');
const errorHandlers = require('./middleware/error-handlers');
// const methodOverride = require('method-override');

// initialize our express app
const app = express();

require('./database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const resourceNotFoundHandler = errorHandlers.resource_not_found;

// app.use(methodOverride());
app.use(resourceNotFoundHandler);

require('./routes')(app);

port = 5000;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});