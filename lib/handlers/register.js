var JSONStream = require('JSONStream');

var Register = (function() {
  function Register(ledger) {
    this.ledger = ledger;
  }
  
  Register.prototype.handle = function(req, res, next) {
    var options = { };
    
    if (req.params.account) {
      options.account = req.params.account;
    }
    
    res.setHeader('content-type', 'application/json');

    this.ledger.register(options)
      .pipe(JSONStream.stringify())
      .pipe(res)
      .once('error', function (err) {
        res.statusCode = 500;
        res.end(String(err));
      })
      .once('end', next);
  };

  return Register;
})();

module.exports.Register = Register;