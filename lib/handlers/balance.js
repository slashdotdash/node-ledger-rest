/*global exports */
(function () {
  var Balance = (function() {
    function Balance(ledger) {
      this.ledger = ledger;
    }
    
    Balance.prototype.handle = function(req, res, next) {
      var entries = [];
      
      this.ledger.balance()
        .on('record', function(entry) {
          entries.push(entry);
        })
        .once('end', function() {
          res.json(entries);
          next();
        })
        .on('error', function(error) {
          res.send(error);
        });
    };

    return Balance;
  })();

  exports.Balance = Balance;
})();