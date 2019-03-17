const mongoose = require("mongoose");

let db_uri = require('./config').database_uri;

mongoose.connect(db_uri, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connected successfully");
});