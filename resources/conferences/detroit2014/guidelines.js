var guidelines = require('./data/guidelines');

var Guidelines = module.exports = function() {
  this.guidelines = guidelines;
};

Guidelines.prototype.init = function(config) {
  config
    .path('/guidelines')
    .get('/', this.list);
};

Guidelines.prototype.list = function(env, next) {
   this.guidelines.links = [
    { rel: 'self', href: env.helpers.uri('/conferences/' + env.config.location + env.request.url) },
    { rel: 'index', href: env.helpers.uri('/conferences/') + env.config.location }
  ];
  env.response.statusCode = 200;
  env.response.body = this.guidelines;
  next(env);
};
