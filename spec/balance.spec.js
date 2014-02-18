var chai = require('chai'),
    expect = chai.expect,
    restify = require('restify'),
    LedgerRest = require('../lib/ledger-rest').LedgerRest;

describe('Balance', function() {
  var spec, server, client;
  
  // start ledger-rest server
  function startServer() {
    server = new LedgerRest({ file: 'spec/data/single-transaction.dat' });
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
  
  describe('single transaction', function() {
    var balances;
    
    beforeEach(function(done) {
      client.get('/balance', function(err, req, res, obj) {
        if (err) {
          spec.fail(err);
          return done();
        }

        balances = obj;
        done();
      });
    });

    it('should return balance for two accounts', function() {
      expect(balances.length).to.equal(2);
    });
    
    it('should parse first balance', function() {
      expect(balances[0]).to.eql({
        total: {
          currency : '£',
          amount : 1000,
          formatted : '£1,000.00'
        },
        account: {
          fullname: 'Assets:Checking',
          shortname: 'Assets:Checking',
          depth: 2,
        }
      });
    });
    
    it('should parse second balance', function() {
      expect(balances[1]).to.eql({
        total: {
          currency : '£',
          amount : -1000,
          formatted : '£-1,000.00'
        },
        account: {
          fullname: 'Income:Salary',
          shortname: 'Income:Salary',
          depth: 2,
        }
      });
    });
  });
});