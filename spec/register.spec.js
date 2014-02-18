var chai = require('chai'),
    expect = chai.expect,
    restify = require('restify'),
    LedgerRest = require('../lib/ledger-rest').LedgerRest;

describe('Register', function() {
  var spec, server, client;
  
  // start ledger-rest server
  function startServer() {
    server = new LedgerRest({ file: 'spec/data/drewr.dat' });
    server.listen(3000);
  }
  
  function stopServer(done) {
    server.close(done);
  }
  
  // create JSON client
  function createClient() {
    client = restify.createJsonClient({
      url: 'http://localhost:3000',
      version: '*',
      headers: {
        connection: 'close'
      }
    });
  }
  
  beforeEach(function() {
    spec = this;
    
    startServer();
    createClient();
  });

  afterEach(function(done) {
    stopServer(done);
  });
  
  describe('multiple transactions', function() {
    var entries;
    
    beforeEach(function(done) {
      client.get('/register', function(err, req, res, obj) {
        if (err) {
          spec.fail(err);
          return done();
        }

        entries = obj;
        done();
      });
    });

    it('should return register entries', function() {
      expect(entries.length).to.equal(11);
    });
  });
});