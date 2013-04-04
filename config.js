function Config() {
  this.port = process.env.PORT || 3001;
  this.baseHrefUri = process.env.BASE_HREF_URI || 'http://localhost:' + this.port;
  this.baseRelUri = process.env.BASE_REL_URI || 'http://rels.api-craft.org';
  this.dbUri = process.env.DATABASE_URL || 'http://localhost:5984';
}

module.exports = new Config();
