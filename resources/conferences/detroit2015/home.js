module.exports = function(addHandler) {
	addHandler('request', function(env, next) {
		var body = {
      event:
			{ 
				name: 'Open Space Conference',
				identifier: 1,
				version: '3.0',
				start: "Monday July 27th, 2015 8am",
				end: "Wednesday July 29th, 2015 8pm",
				theme: 'Where do we lead the APIs of tomorrow?',
				image: 'port-detroit.jpg',
				location: {
					display_name:'Port Detroit',
					city: 'Detroit',
					display_address: [ '130 E Atwater St', 'Downtown Detroit', 'Detroit, MI 48226' ],
					geo_accuracy: 8,
					neighborhoods: [ 'Downtown Detroit' ],
					postal_code: '48226',
					country_code: 'US',
					address: [ '130 E Atwater St' ],
					coordinate: { latitude:  42.327278, longitude: -83.041668 },
					state_code: 'MI'
				},
				format: 'Open Space <http://en.wikipedia.org/wiki/Open-space_technology>',
				yelp_url: 'http://www.yelp.com/biz/waterview-loft-at-port-detroit-detroit'
			},
			links: [
			{ rel: 'self', href: env.helpers.uri('/conferences/') + env.config.location }
			]
		};

		var rels = ['agenda', 'venues', 'goals', 'guidelines', 'attendees',
		'sessions', 'hotels', 'transit'];

		rels.forEach(function(rel) {
			body.links.push({
				rel: env.helpers.rel(rel),
				href: env.helpers.uri('/conferences/' + env.config.location + '/' + rel)
			});
		});

		body.links.push({ rel: 'index', href: env.helpers.uri('home') });

		env.response.body = body;
		next(env);
	});
};
