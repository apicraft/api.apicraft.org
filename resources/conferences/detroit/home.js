var helpers = require('../helpers');

module.exports = function(addHandler) {
  addHandler('request', function(env, next) {
    var body = {
      name: 'API Craft Conference',
      version: '1.0',
      start: 'Tue Jul 30 2013 08:00:00 GMT-0400 (EDT)',
      end: 'Wed Jul 31 2013 19:00:00 GMT-0400 (EDT)',
      location: 'Detroit, MI',
      spots: '150-200',
      format: 'Open Space <http://en.wikipedia.org/wiki/Open-space_technology>',
      rules: '!corporate_logos && !product_pitches && (represent_thyself && !represent_thycompany)',
      links: [
        { rel: 'self', href: helpers.uri('home') }
      ]
    };

    var rels = ['goals', 'guidelines', 'tickets', 'attendees',
                'hotels', 'sessions', 'parties', 'questions',
                'places'];

    rels.forEach(function(rel) {
      body.links.push({
        rel: helpers.rel(rel),
        href: helpers.uri(rel)
      });
    });

    env.response.body = body;
    next(env);
  });
};
