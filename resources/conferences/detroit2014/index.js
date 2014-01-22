var questions = require('./questions');
var titan = require('titan');

module.exports = function(server) {
  server
    .use(titan)
    .get('/', require('./home'))
    .add(require('./agenda'))
    .get('/attendees', require('./attendees'))
    .add(require('./guidelines'))
    .get('/hotels', require('./hotels'))
    .add(require('./sessions'))
    .get('/parties', require('./parties'))
    .add(require('./goals'))
    .add(require('./transit'))
    .get('/questions', questions.get)
    .post('/questions', questions.post);
};
