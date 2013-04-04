var detroit = require('./detroit');

module.exports = function(server) {
  server
    .get('/', require('./home'))
    .map('/detroit', function(srv) {
      srv
        .get('/', detroit.home)
        .get('/attendees', detroit.attendees)
        .get('/hotels', detroit.hotels)
        .get('/sessions', detroit.sessions)
        .get('/tickets', detroit.tickets)
        .get('/places', detroit.places)
        .get('/questions', detroit.questions.get)
        .post('/questions', detroit.questions.post)
    });
};

