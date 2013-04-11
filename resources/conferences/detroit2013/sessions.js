module.exports = function(addHandler) {
  addHandler('request', function(env, next) {
  	var sessions = {};
    sessions.sessions = [{"description":"Sessions will be set by the attendees on Day 1.  Proceedings will be posted after the conference"}];
    sessions.links = [
      { rel: 'self', href: env.helpers.uri('/conferences/' + env.config.location + env.request.url) },
      { rel: 'index', href: env.helpers.uri('/conferences/') + env.config.location }
    ];
    env.response.statusCode = 200;
    env.response.body = sessions;
    next(env);
  });
};
