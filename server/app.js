const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./routes')(app);

port = 5000;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});