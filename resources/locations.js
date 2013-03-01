var detroit = require('./locations/detroit.json');

var yelp = require('yelp').createClient({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

var cached = null;

module.exports = function(proxy) {
  proxy
    .get('/detroit', function(handle) {
      handle('request', function(env, next) {
        env.response.setHeader('Content-Type', 'application/json;charset=UTF-8');

        if (cached) {
          env.response.statusCode = 200;
          env.response.body = cached;
          next(env);
          return;
        }

        var len = detroit.locations.length;
        getLocations(detroit.locations, [], len, 0, function(err, locations) {
          if (err) {
            console.log(err);
            env.response.statusCode = 500;
            env.response.body = { error: 'Internal Server Error' };
            next(env);
            return;
          }

          cached = locations;
          env.statusCode = 200;
          env.response.body = locations;
          next(env);
        });
      });
    });
};

function getLocations(source, dest, len, index, cb) {
  if (!dest) {
    dest = [];
  }

  var location = source[index];
  yelp.business(location.yelpID, function(err, data) {
    if (data && !err) {
      populateLocation(data, location);
      dest.push(location);
      if (index < len - 1) {
        getLocations(source, dest, len, index+1, cb);
      } else {
        cb(null, dest);
      }
    } else {
      // Swallow errors for now.  Sometimes, they're dumb.
      getLocations(source, dest, len, index+1, cb);
      //cb(err);
    }
  });
}

function populateLocation(source, dest) {
	
	dest.id = source.id;
	dest.is_closed = source.is_closed;
	dest.name = source.name;
	dest.image_url = source.image_url;
	dest.display_phone = source.display_phone;
	dest.rating = source.rating;
	dest.rating_img_url_small = source.rating_img_url_small;
	dest.url = source.url;
	dest.location = source.location;
}
