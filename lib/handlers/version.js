var Version = (function() {
  function Version(ledger) {
    this.ledger = ledger;
  }
  
  Version.prototype.handle = function(req, res, next) {
    this.ledger.version(function(err, version) {
      if (err) {
        return res.send(err);
      }
      
      res.send({ version: version });
      
      return next();
    });
  };

  return Version;
})();

module.exports.Version = Version;