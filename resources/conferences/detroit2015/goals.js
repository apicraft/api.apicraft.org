var goals = require('./data/goals');

var Goals = module.exports = function() {
  this.goals = goals;
};

Goals.prototype.init = function(config) {
  config
    .path('/goals')
    .get('/', this.list);
};

Goals.prototype.list = function(env, next) {
  this.goals.links = [
    { rel: 'self', href: env.helpers.uri('/conferences/' + env.config.location + env.request.url) },
    { rel: 'index', href: env.helpers.uri('/conferences/') + env.config.location }
  ]; 

  env.response.statusCode = 200;
  env.response.body = this.goals;
  next(env);
};

