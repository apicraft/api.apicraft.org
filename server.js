var argo = require('argo-server');
var config = require('./config');
var middleware = require('./middleware');
var resources = require('./resources');

var server = argo()
  .use(middleware.config(config))
  .use(middleware.helpers)
  .use(middleware.database)
  .use(middleware.cors)
  .use(middleware.errors)
  .get('/', resources.home)
  .map('/conferences', resources.conferences);

server.listen(config.port);

console.log('API Craft Conf API listening on ' + config.baseHrefUri);
