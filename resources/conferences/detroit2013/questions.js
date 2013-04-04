var querystring = require('querystring');

exports.get = function(handle) {
  handle('request', function(env, next) {
    var parts = env.request.url.split('/');
    var last = parts[parts.length - 1];

    if (last === 'questions') {
      env.db.view('questions', 'all', function(err, body) {
        if (!body) {
          env.response.statusCode = 404;
          next(env);
        }
        env.response.statusCode = 200;
        var questions = [];
        body.rows.forEach(function(row) {
          var val = row.value;
          var question = {
            id: row.id,
            question: val.question,
            answer: val.answer,
            status: val.status
          };
          questions.push(question);
        });
        env.response.body = { questions: questions };
        env.response.body.links = [
          { rel: 'self', href: env.helpers.uri('/conferences/' + env.config.location + env.request.url) },
          { rel: 'index', href: env.helpers.uri('home') }
        ];
        next(env);
      });
    } else {
      env.db.get(last, function(err, body) {
        if (err) {
          env.response.statusCode = 500;
          next(env);
          return;
        }
        if (!body) {
          env.response.statusCode = 404;
          next(env);
          return; 
        }
        env.response.statusCode = 200;
        var q = {
          id: body._id,
          question: body.question,
          answer: body.answer,
          status: body.status
        }
        env.response.body = q;
        env.response.body.links = [
          { rel: 'self', href: env.helpers.uri('/conferences/' + env.config.location + env.request.url) },
          { rel: 'index', href: env.helpers.uri('home') }
        ];
        next(env);
      });
    }
  });
};

exports.post = function(handle) {
  handle('request', function(env, next) {
    env.request.getBody(function(err, body) {
      if (err) {
        env.response.statusCode = 400;
        next(env);
        return;
      }

      var b = querystring.parse(body.toString());
      var q = { question: b.question, type: 'question', status: 'new' };

      env.db.insert(q, function(err, doc) {
        env.response.statusCode = 201;
        env.response.setHeader('Location', env.helpers.uri('/conferences/' + env.config.location + '/questions/' + doc.id));

        next(env);
      });
    });
  });
};
