/*global exports, require */
(function () {
  var Register = (function() {
    var JSONStream = require('JSONStream');
    
    function Register(ledger) {
      this.ledger = ledger;
    }
    
    Register.prototype.handle = function(req, res, next) {
      res.header('Last-Modified', new Date(2013, 0, 1));
      res.setHeader('content-type', 'application/json');

      this.ledger.register()
        .once('error', function (err) {
          res.statusCode = 500;
          res.end(String(err));
        })
        .once('end', next)
        .pipe(JSONStream.stringify())
        .pipe(res);
    };

    return Register;
  })();

  exports.Register = Register;
})();