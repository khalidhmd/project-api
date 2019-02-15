const mongoose = require("mongoose");

// ES6 Promises
mongoose.Promise = global.Promise;
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
// Connect to db before tests run
before(function(done) {
  // Connect to mongodb
  mongoose.connect("mongodb://user1:password1@ds145184.mlab.com:45184/test_db");
  mongoose.connection
    .once("open", function() {
      console.log("Connection has been made, now make fireworks...\n");
      mongoose.connection.db.dropDatabase(function(err, result) {
        done();
      });
    })
    .on("error", function(error) {
      console.log("Connection error:", error);
    });
});
