var _ = require('lodash'),
    restify = require('restify'),
    Ledger = require('ledger-cli').Ledger,
    Version = require('./handlers/version').Version,
    Balance = require('./handlers/balance').Balance,
    Register = require('./handlers/register').Register;
      
var LedgerRest = (function() {
  var defaultConfig = {
    name: 'ledger-rest',
    debug: false
  };
  
  function LedgerRest(options) {
    this.options = _.defaults({}, options, defaultConfig);
    
    this.ledger = new Ledger(this.options);
    
    this.createServer(this.options);
    this.configureRouting();
  }
  
  LedgerRest.prototype.createServer = function(config) {
    this.server = restify.createServer({
      name: config.name
    });
    
    this.server.use([
      restify.acceptParser(this.server.acceptable),
      restify.gzipResponse()
    ]);
  };
  
  LedgerRest.prototype.listen = function(port, callback) {
    this.server.listen(port, function() {
      this.log('%s listening at %s', this.server.name, this.server.url);
      
      if (callback) {
        callback();
      }
    }.bind(this));
  };
  
  LedgerRest.prototype.close = function(callback) {
    this.log('%s is closing...', this.server.name);
    
    this.server.close(function() {
      this.log('%s has closed', this.server.name);
      if (callback) {
        callback();
      }
    }.bind(this));
  };
  
  LedgerRest.prototype.configureRouting = function() {
    var version = new Version(this.ledger),
        balance = new Balance(this.ledger),
        register = new Register(this.ledger);
    
    this.server.get('/version', version.handle.bind(version));
    this.server.get('/balance', balance.handle.bind(balance));
    this.server.get('/register', register.handle.bind(register));
    this.server.get('/register/:account', register.handle.bind(register));
  };
  
  LedgerRest.prototype.log = function() {
    if (this.options.debug) {
      console.log.apply(console, arguments);
    }
  };
  
  return LedgerRest;
})();

module.exports.LedgerRest = LedgerRest;