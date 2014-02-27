var app = require('../app');

module.exports = function(){
  app.configure(function() {
    app.use(clientErrorHandler);
  });

  function clientErrorHandler(err, req, res, next) {
    console.error('Error: ', err.toString());
    res.send(500, err.toString());
    if (req.xhr) {
      console.error(err);
      res.send(500, err.toString());
    }
  }
};
