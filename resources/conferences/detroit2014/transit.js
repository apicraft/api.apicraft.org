var transit = require('./data/transit');

var Transit = module.exports = function() {
  this.transit = transit;
};

Transit.prototype.init = function(config) {
  config
    .path('/transit')
    .get('/', this.list);
};

Transit.prototype.list = function(env, next) {
  this.transit.links = [
    { rel: 'self', href: env.helpers.uri('/conferences/' + env.config.location + env.request.url) },
    { rel: 'index', href: env.helpers.uri('/conferences/') + env.config.location }
  ];
  env.response.statusCode = 200;
  env.response.body = this.transit;
  next(env);
};
