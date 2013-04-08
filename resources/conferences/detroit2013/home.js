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
        { rel: 'self', href: env.helpers.uri('home') }
      ]
    };

    var rels = ['goals', 'guidelines', 'agenda', 'attendees',
                'hotels', 'sessions', 'parties', 'questions'];

    rels.forEach(function(rel) {
      body.links.push({
        rel: env.helpers.rel(rel),
        href: env.helpers.uri('/conferences/' + env.config.location + '/' + rel)
      });
    });

    env.response.body = body;
    next(env);
  });
};
