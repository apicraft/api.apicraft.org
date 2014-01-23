var agenda = require('./data/agenda');

var Agenda = module.exports = function() {
  this.agenda = { agenda: agenda };
};

Agenda.prototype.init = function(config) {
  config
    .path('/agenda')
    .get('/', this.list);
};

Agenda.prototype.list = function(env, next) {
  env.response.statusCode = 200;
  env.response.body.links = [
    { rel: 'self', href: env.helpers.uri('/conferences/' + env.config.location + env.request.url) },
    { rel: 'index', href: env.helpers.uri('/conferences/') + env.config.location }
  ];
  env.response.body = this.agenda;
  next(env);
};

