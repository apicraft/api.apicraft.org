function Config() {
  this.port = process.env.PORT || 3001;
  this.baseHrefUri = process.env.BASE_HREF_URI || 'http://localhost:' + this.port;
  this.baseRelUri = process.env.BASE_REL_URI || 'http://rels.api-craft.org';
  this.location = process.env.CONF_LOCATION || 'detroit2015';
  this.dbUri = process.env.DATABASE_URL || 'http://localhost:5984/api-craft-conf-' + this.location;
  this.eventbriteAppKey = process.env.EVENTBRITE_APP_KEY;
  this.eventbriteUserKey = process.env.EVENTBRITE_USER_KEY;
  this.eventbriteEventId = process.env.EVENTBRITE_EVENT_ID;
  this.mailgun = {
    username: process.env.MAILGUN_USERNAME,
    password: process.env.MAILGUN_PASSWORD,
    uri: process.env.MAILGUN_URI,
    responseUrl: process.env.MAILGUN_RESPONSE_URL
  };
}

module.exports = new Config();
