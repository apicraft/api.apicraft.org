module.exports = function(addHandler) {
	addHandler('request', function(env, next) {
		var body = {
			venues: [
			{ 
				name: 'Hypermedia Panel',
				identifier: 1,
				version: '1.0',
				start: JSON.stringify(new Date("July 28, 2014 13:00:00")); // 'Mon Jul 28 2014 13:00:00 GMT-0400 (EDT)',
				end: JSON.stringify(new Date("July 28, 2014 19:00:00")); // 'Mon Jul 28 2014 20:00:00 GMT-0400 (EDT)',
				theme: 'Where do we lead the hypermedia APIs of tomorrow?',
				image: 'grand-circus.jpg',
				location: {
					display_name:'Grand Circus',
					city: 'Detroit',
					display_address: [ '1570 Woodward Ave', 'Downtown Detroit', 'Detroit, MI 48226' ],
					geo_accuracy: 8,
					neighborhoods: [ 'Downtown Detroit' ],
					postal_code: '48226',
					country_code: 'US',
					address: [ '1570 Woodward Ave' ],
					coordinate: { latitude:  42.335866, longitude: -83.049689 },
					state_code: 'MI'
				},
				format: 'Panel Discussion <http://en.wiktionary.org/wiki/panel_discussion>',
				yelp_url: 'http://www.yelp.com/biz/grand-circus-detroit'
			},
			{ 
				name: 'API Craft Conference',
				identifier: 2,
				version: '2.0',
				start: JSON.stringify(new Date("July 29, 2014 08:00:00")); // 'Tue Jul 29 2014 20:00:00 GMT-0400 (EDT)',
				end: JSON.stringify(new Date("July 30, 2014 20:00:00")); // 'Wed Jul 30 2014 19:00:00 GMT-0400 (EDT)',
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
			}
			],
			links: [
			{ rel: 'self', href: env.helpers.uri('/conferences/') + env.config.location }
			]
		};

		var rels = ['goals', 'guidelines', 'agenda', 'attendees',
		'hotels', 'sessions', 'parties', 'questions', 'transit'];

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
