const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.render('index.html');
});

/* For Facebook Validation */
app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === 'overcat') {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).end();
  }
});

/* Handling all messenges */
// app.post('/webhook', (req, res) => {
//   console.log(req.body);
//   if (req.body.object === 'page') {
//     req.body.entry.forEach((entry) => {
//       entry.messaging.forEach((event) => {
//         if (event.message && event.message.text) {
//           sendMessage(event);
//         }
//       });
//     });
//     res.status(200).end();
//   }
// });

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});
