var crypto = require('crypto');
var Eventbrite = require('eventbrite');

module.exports = function(addHandler) {
  addHandler('request', function(env, next) {
    var options = {
      app_key: env.config.eventbriteAppKey,
      user_key: env.config.eventbriteUserKey
    };

    var client = Eventbrite(options);

    client.event_list_attendees({ id: env.config.eventbriteEventId }, function(err, data) {
      var body = { attendees: [], links: [] };

      data.attendees.forEach(function(attendee) {
        attendee = attendee.attendee;
        var a = {
          firstName: attendee.first_name,
          lastName: attendee.last_name 
        };

        var githubId;
        var twitterId;

        attendee.answers.forEach(function(answer) {
          console.log(answer);
          if (answer.answer.question_id === 4546963) {
            twitterId = answer.answer.answer_text;
          } else if (answer.answer.question_id === 4546967) {
            githubId = answer.answer.answer_text;
          }
        });

        if (githubId) {
          a.github = 'https://github.com/' + githubId;
        }

        if (twitterId) {
          a.twitter = 'https://twitter.com/' + twitterId;
        }

        var hash = crypto.createHash('md5');
        hash.update(attendee.email.toLowerCase());

        var gravatarUrl = 'http://gravatar.com/avatar/' + hash.digest('hex');

        a.avatar = gravatarUrl;
        body.attendees.push(a);
      });

      body.links = [
        { rel: 'self', href: env.helpers.uri('/conferences/' + env.config.location + env.request.url) },
        { rel: 'index', href: env.helpers.uri('/conferences/') + env.config.location }
      ];

      env.response.body = body;
      next(env);
    });

  });
};
