const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

/* For Facebook Validation */
app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] && req.query['hub.verify_token'] === 'EAAGrXoSazs4BACYj40rnhMIIiKOiLYF72strzRrDi2zEyrCqAoxDUdmzrOI2JxQ8bHj8qNpk5DwhXzPZCfh1OZAJaSejYoF8G1kvpylAiYopL9EoRZAq0QfrMdnACihGGmhLm5df5GAtButdKgIaQBCG368ZBmF6iPxxZAZCZCWnrdB1DYjNGye') {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).end();
  }
});

/* Handling all messenges */
app.post('/webhook', (req, res) => {
  console.log(req.body);
  if (req.body.object === 'page') {
    req.body.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.message && event.message.text) {
          sendMessage(event);
        }
      });
    });
    res.status(200).end();
  }
});
