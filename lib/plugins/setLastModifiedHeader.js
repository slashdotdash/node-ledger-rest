var setLastModifiedHeader = function(handler, date) {
  return function(req, res, next) {
    res.header('Last-Modified', date);

    handler.handle(req, res, next);
  };
};

module.exports.setLastModifiedHeader = setLastModifiedHeader;