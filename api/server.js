const http = require('http');
const app = require('./app');


const server = http.createServer(app);
server.listen(3000, 'localhost', function () {
  console.log('App listening to port 3000');
});