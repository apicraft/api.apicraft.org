var argo = require('argo');
var config = require('./config');
var middleware = require('./middleware');
var resources = require('./conf');

var server = argo()
  .use(middleware.config(config))
  .use(middleware.helpers)
  .use(middleware.database)
  .use(middleware.errors)
  .get('/', resources.home)
  .map('/conferences', resources.conferences);

server.listen(config.port);

console.log('API Craft Conf API listening on ' + config.baseHrefUri);
