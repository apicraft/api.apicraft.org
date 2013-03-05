var argo = require('argo-server');
var config = require('./config');
var middleware = require('./middleware');
var resources = require('./resources');

argo()
  .use(middleware.cors)
  .use(middleware.errors)
  .get('/', resources.home)
  .get('/conferences', resources.conferences.home)
  .map('/conferences/detroit', resources.conferences.detroit)
  .listen(config.port);

console.log('API Craft Conf API listening on ' + config.baseHrefUri);
