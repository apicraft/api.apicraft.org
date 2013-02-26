var argo = require('argo-server');
var errors = require('./middleware/errors');
var contentType = require('./middleware/contentType');
var config = require('./config');
var helpers = require('./helpers');

argo()
  .use(errors)
  .use(contentType)
  .get('/', require('./resources/home'))
  .get('/attendees', require('./resources/attendees'))
  .get('/schedule', require('./resources/schedule'))
  .get('/tickets', require('./resources/tickets'))
  .get('/concierge', require('./resources/concierge'))
  .listen(config.port);

console.log('API Craft Conf API listening on ' + helpers.uri('home'));
