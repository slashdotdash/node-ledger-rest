#!/usr/bin/env node

/*global require */
(function () {
  var LedgerRest = require('../lib/ledger-rest').LedgerRest;

  var server = new LedgerRest();
  
  server.listen(3000);
})();