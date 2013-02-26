function Config() {
  this.port = process.env.port || 3000;
  this.baseUri = process.env.BASE_URI || 'http://localhost:' + this.port;
}

module.exports = new Config();
