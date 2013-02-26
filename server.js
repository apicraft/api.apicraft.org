var argo = require('argo-server');
var errors = require('./errors');
var contentType = require('./contentType');
var config = require('./config');

argo()
  .use(errors)
  .use(contentType)
  .get('/', require('./home'))
  .get('/attendees', require('./attendees'))
  .get('/schedule', require('./schedule'))
  .get('/tickets', require('./tickets'))
  .get('/concierge', require('./concierge'))
  .listen(config.port);

console.log('API Craft Conf API listening on ' + config.baseUri);
