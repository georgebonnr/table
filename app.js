var express = require('express'),
    http    = require('http'),
    app     = module.exports = express();

require('./config')();
require('./routers')();

http.createServer(app);
if (require.main === module) {
  app.listen(app.get('port'), function(){
    console.info('Listening on port ' + app.get('port'));
  });
} else {
  module.exports.app = app;
}
