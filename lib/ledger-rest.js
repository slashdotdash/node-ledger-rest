/*global exports, require, console */
(function () {
  var _ = require('lodash'),
      restify = require('restify'),
      Ledger = require('ledger-cli').Ledger,
      Version = require('./handlers/version').Version,
      Balance = require('./handlers/balance').Balance;
        
  var LedgerRest = (function() {
    var defaultConfig = {
      name: 'ledger-rest'
    };
    
    function LedgerRest(options) {
      options = _.defaults({}, options, defaultConfig);
      
      this.ledger = new Ledger(options);
      
      this.createServer(options);
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
    
    LedgerRest.prototype.listen = function(port) {
      this.server.listen(port, function() {
        console.log('%s listening at %s', this.server.name, this.server.url);
      }.bind(this));
    };
    
    LedgerRest.prototype.configureRouting = function() {
      var version = new Version(this.ledger),
          balance = new Balance(this.ledger);
      
      this.server.get('/version', version.handle.bind(version));
      this.server.get('/balance', balance.handle.bind(balance));
    };
        
    return LedgerRest;
  })();

  exports.LedgerRest = LedgerRest;
})();