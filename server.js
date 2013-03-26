var argo = require('argo-server');
var Medea = require('medea');
var config = require('./config');
var middleware = require('./middleware');
var resources = require('./resources');

var medea = new Medea();

var server = argo()
  .use(function(handle) { handle('request', function(env, next) { env.medea = medea; next(env); }); })
  .use(middleware.cors)
  .use(middleware.errors)
  .get('/', resources.home)
  .map('/conferences', resources.conferences)

medea.open(__dirname + '/tmp/data', function() {
  server.listen(config.port);
  console.log('API Craft Conf API listening on ' + config.baseHrefUri);
});
