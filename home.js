var config = require('./config');

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
      links: [
        { rel: ['self'], href: config.baseUri + '/' },
        { rel: ['alternate'], type: 'text/calendar', href: config.baseUri + '/conference.ics' }
      ]
    };

    env.responseBody = JSON.stringify(body);
    next(env);
  });
};
