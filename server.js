var argo = require('argo-server');
var config = require('./config');
var middleware = require('./middleware');
var resources = require('./resources');

argo()
  .use(middleware.cors)
  .use(middleware.errors)
  .use(middleware.contentType)
  .get('/', resources.home)
  .get('/attendees', resources.attendees)
  .get('/concierge', resources.concierge)
  .get('/schedule', resources.schedule)
  .get('/tickets', resources.tickets)
  .map('/locations', resources.locations)
  .listen(config.port);

console.log('API Craft Conf API listening on ' + config.baseHrefUri);
