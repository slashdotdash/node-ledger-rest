/*global exports, require, console */
(function () {
  var _ = require('lodash'),
      restify = require('restify'),
      Ledger = require('ledger-cli').Ledger;
        
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
      this.server.use(restify.acceptParser(this.server.acceptable));
    };
    
    LedgerRest.prototype.listen = function(port) {
      this.server.listen(port, function() {
        console.log('%s listening at %s', this.server.name, this.server.url);
      }.bind(this));
    };
    
    LedgerRest.prototype.configureRouting = function() {
      this.server.get('/version', function(req, res, next) {
        this.ledger.version(function(err, version) {
          if (err) {
            return res.send(err);
          }
          
          res.send({ version: version });
          return next();
        });
      }.bind(this));
    };
        
    return LedgerRest;
  })();

  exports.LedgerRest = LedgerRest;
})();