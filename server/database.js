const mongoose = require("mongoose");

let dev_db_uri = "mongodb://localhost:27017/SimpleOnlineStore";

mongoose.connect(dev_db_uri, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connected successfully");
});