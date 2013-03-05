var detroit = require('./conferences/detroit');

module.exports = function(server) {
  server
    .get('/', require('./conferences/home'))
    .map('/detroit', function(srv) {
      srv
        .get('/', detroit.home)
        .get('/attendees', detroit.attendees)
        .get('/hotels', detroit.hotels)
        .get('/sessions', detroit.sessions)
        .get('/tickets', detroit.tickets)
        .get('/places', detroit.places)
    });
};

