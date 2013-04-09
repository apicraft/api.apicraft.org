var goals = require('./data/goals');

module.exports = function(handle){
	handle('request', function(env, next){
		goals.links = [
	      { rel: 'self', href: env.helpers.uri('/conferences/' + env.config.location + env.request.url) },
	      { rel: 'index', href: env.helpers.uri('home') }
	    ];

	    env.response.statusCode = 200;
	    env.response.body = goals;
	    next(env);
	});
}