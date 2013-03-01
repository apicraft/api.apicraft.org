var helpers = require('../helpers');

module.exports = function(addHandler) {
  addHandler('request', function(env, next) {
    var body = {
      properties: {
        name: 'API Craft Conference',
        version: '1.0',
        start: 'Tue Jul 30 2013 08:00:00 GMT-0400 (EDT)',
        end: 'Wed Jul 31 2013 19:00:00 GMT-0400 (EDT)',
        location: 'Detroit, MI',
        spots: '150-200',
        format: 'Open Space <http://en.wikipedia.org/wiki/Open-space_technology>',
        rules: '!corporate_logos && !product_pitches && (represent_thyself && !represent_thycompany)',
        preParty: true,
        intraParty: true,
        postParty: true
      },
      entities: [],
      links: [
        { rel: ['self'], href: helpers.uri('home') },
        { rel: ['alternate'], type: 'text/calendar', href: helpers.uri('/conference.ics') }
      ]
    };

    var rels = ['tickets', 'attendees', 'concierge', 'schedule'];

    rels.forEach(function(rel) {
      body.entities.push({
        rel: [helpers.rel(rel)],
        href: helpers.uri(rel)
      });
    });

    env.response.body = JSON.stringify(body);
    next(env);
  });
};
