var argo = require('argo-server');

var port = process.env.PORT || 3000;
var baseUri = process.env.BASE_URI || 'http://localhost:' + port;

argo()
  .use(function(addHandler) {
    addHandler('response', function(env, next) {
      var body;
      var errors = {
        404: 'Not Found',
        500: 'Internal Server Error',
        405: 'Method Not Allowed'
      };

      if (errors[env.response.statusCode]) {
        var body = {
          properties: {
            error: errors[env.response.statusCode]
          },
          links: [
            { rel: ['self'], href: baseUri + env.request.url }
          ]
        };
        env.responseBody = JSON.stringify(body);
      }

      next(env);
    });
  })
  .use(function(addHandler) {
    addHandler('response', function(env, next) {
      env.response.setHeader('Content-Type', 'application/vnd.siren+json');
      next(env);
    });
  })
  .get('/', function(addHandler) {
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
          { rel: ['self'], href: baseUri + '/' },
          { rel: ['alternate'], type: 'text/calendar', href: baseUri + '/conference.ics' }
        ]
      };

      env.responseBody = JSON.stringify(body);
      next(env);
    });
  })
  .get('/attendees', function(addHandler) {
    addHandler('request', function(env, next) {
      var body = {
        links: [
          { rel: ['self'], href: baseUri + env.request.url }
        ]
      };
      env.responseBody = JSON.stringify(body);
      next(env);
    });
  })
  .get('/schedule', function(addHandler) {
    addHandler('request', function(env, next) {
      var body = {
        links: [
          { rel: ['self'], href: baseUri + env.request.url }
        ]
      };
      env.responseBody = JSON.stringify(body);
      next(env);
    });
  })
  .get('/tickets', function(addHandler) {
    addHandler('request', function(env, next) {
      var body = {
        links: [
          { rel: ['self'], href: baseUri + env.request.url }
        ]
      };
      env.responseBody = JSON.stringify(body);
      next(env);
    });
  })
  .get('/concierge', function(addHandler) {
    addHandler('request', function(env, next) {
      var body = {
        links: [
          { rel: ['self'], href: baseUri + env.request.url }
        ]
      };
      env.responseBody = JSON.stringify(body);
      next(env);
    });
  })
  .listen(port);

console.log('API Craft Conf API listening on ' + baseUri);
