/*global exports */
(function () {
  var Register = (function() {
    function Register(ledger) {
      this.ledger = ledger;
    }
    
    Register.prototype.handle = function(req, res) {
      var options = { };
      
      if (req.params.account) {
        options.account = req.params.account;
      }
      
      res.setHeader('content-type', 'application/json');

      var entries = [];

      this.ledger.register(options)
        .once('error', function (err) {
          res.statusCode = 500;
          res.end(String(err));
        })
        .once('end', function() {
          res.end(JSON.stringify(entries));
        })
        .on('data', function(entry) {
          entries.push(entry);
        });
    };

    return Register;
  })();

  exports.Register = Register;
})();