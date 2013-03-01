var argo = require('argo-server');
var contentType = require('./middleware/content_type');
var config = require('./config');
var cors = require('./middleware/cors');
var errors = require('./middleware/errors');
var helpers = require('./helpers');

argo()
  .use(cors)
  .use(errors)
  .use(contentType)
  .get('/', require('./resources/home'))
  .get('/attendees', require('./resources/attendees'))
  .get('/schedule', require('./resources/schedule'))
  .get('/tickets', require('./resources/tickets'))
  .get('/concierge', require('./resources/concierge'))
  .map('/locations', require('./resources/locations'))
  .listen(config.port);

console.log('API Craft Conf API listening on ' + helpers.uri('home'));
