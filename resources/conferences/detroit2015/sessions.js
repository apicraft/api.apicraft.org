var Sessions = module.exports = function() {
    this.sessions = {};
    this.sessions.sessions = [{"description":"Sessions will be set by the attendees on Day 1.  Proceedings will be posted after the conference."}];
};

Sessions.prototype.init = function(config) {
  config
    .path('/sessions')
    .get('/', this.list);
};

Sessions.prototype.list = function(env, next) {
  env.response.statusCode = 200;
  this.sessions.links = [
    { rel: 'self', href: env.helpers.uri('/conferences/' + env.config.location + env.request.url) },
    { rel: 'index', href: env.helpers.uri('/conferences/') + env.config.location }
  ];
  env.response.body = this.sessions;
  next(env);
};
