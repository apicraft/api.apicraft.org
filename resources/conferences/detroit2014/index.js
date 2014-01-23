var questions = require('./questions');
var titan = require('titan');

module.exports = function(server) {
  server
    .use(titan)
    .add(require('./agenda'))
    .add(require('./guidelines'))
    .add(require('./sessions'))
    .add(require('./goals'))
    .add(require('./transit'))
    .get('/', require('./home'))
    .get('/attendees', require('./attendees'))
    .get('/hotels', require('./hotels'))
    .get('/parties', require('./parties'))
    .get('/questions', questions.get)
    .post('/questions', questions.post);
};
