const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const app = express();
var http = require('http').Server(app);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
var io = require('socket.io')(http);

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

app.get('/', function(req, res){
    res.render('index.html');
});
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
