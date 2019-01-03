const mongoose = require('mongoose');

// ES6 Promises
mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
// Connect to db before tests run
before(function(done){

    // Connect to mongodb
    mongoose.connect('mongodb://user1:password1@ds145184.mlab.com:45184/test_db');
    mongoose.connection.once('open', function(){
        console.log('Connection has been made, now make fireworks...\n');
        done();
    }).on('error', function(error){
        console.log('Connection error:', error);
    });

});

// Drop the characters collection before each test
// beforeEach(function(done){
//     // Drop the collection
//     mongoose.connection.collections.mariochars.drop(function(){
//         done();
//     });
// });
