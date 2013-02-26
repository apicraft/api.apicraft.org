function Config() {
  this.port = process.env.port || 3000;
  this.baseHrefUri = process.env.BASE_HREF_URI || 'http://localhost:' + this.port;
  this.baseRelUri = process.env.BASE_REL_URI || 'http://rels.api.apicraft.org';
}

module.exports = new Config();
