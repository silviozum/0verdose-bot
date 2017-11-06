const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const app = express();
var http = require('http').Server(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
var io = require('socket.io')(http);



app.get('/', function(req, res){
    res.render('login.html');
});


var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');

/* route to handle login and registration */
app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);



io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
