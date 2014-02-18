var JSONStream = require('JSONStream');

var Balance = (function() {
  function Balance(ledger) {
    this.ledger = ledger;
  }
  
  Balance.prototype.handle = function(req, res, next) {
    res.setHeader('content-type', 'application/json');

    this.ledger.balance()
      .pipe(JSONStream.stringify())
      .pipe(res)
      .once('error', function (err) {
        res.statusCode = 500;
        res.end(String(err));
      })
      .once('end', next);
  };

  return Balance;
})();

module.exports.Balance = Balance;