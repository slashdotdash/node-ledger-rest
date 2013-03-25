/*global exports, require */
(function () {
  var Balance = (function() {
    var JSONStream = require('JSONStream');
    
    function Balance(ledger) {
      this.ledger = ledger;
    }
    
    Balance.prototype.handle = function(req, res, next) {
      res.setHeader('content-type', 'application/json');

      this.ledger.balance()
        .once('error', function (err) {
          res.statusCode = 500;
          res.end(String(err));
        })
        .once('end', next)
        .pipe(JSONStream.stringify())
        .pipe(res);
    };

    return Balance;
  })();

  exports.Balance = Balance;
})();