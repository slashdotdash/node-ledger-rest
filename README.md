# ledger-rest

REST web service API to access the Ledger command-line interface ([ledger-cli.org](http://ledger-cli.org/)).

> Ledger is a powerful, double-entry accounting system that is accessed from the UNIX command-line.

MIT License

## Dependencies

  * [Ledger 3](http://ledger-cli.org/)
  * [Node.js](nodejs.org) and npm

### Installing Ledger

The simplest way to install Ledger 3 is through [Homebrew](http://mxcl.github.com/homebrew/).

```
brew install ledger --HEAD
```

The `--HEAD` option is required to install version 3.x.

## Usage

Install `ledger-rest` and its dependencies with npm.

```
npm install ledger-rest
```

Use the `LedgerRest` class to create a new RESTful server and start listening on a given port.

```js
var LedgerRest = require('ledger-rest').LedgerRest;

var server = new LedgerRest({ file: 'path/to/ledger/journal/file.dat' });

server.listen(3000);
```

Or use the command line runner to start a server listening on the given port and serving a single Ledger `.dat` file.

```
npm install ledger-rest -g
	
ledger-rest -p <port> -f path/to/ledger/journal/file.dat
```

To confirm the server is listening:

```
curl -H "Content-Type: application/json" http://localhost:<port>/version
    
{"version":"3.1.1-20160111"}
```

The following endpoints are available:

* /version
* /balance
* /register
