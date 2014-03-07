var app     = require ('../app'),
  request   = require('superagent');

app.listen(app.get('port'), function(){
  console.log('Testing server listening on port ' + app.get('port'));
});

var user = request.agent();
var port = 'http://127.0.0.1:'+app.get('port');
var userId;

describe('routing', function(){
  describe('login', function(){
    it('will reroute unauthorized users to login page', function(done){
      user.get(port + '/home').end(function(res){
        // TODO: tests!
      });
    });

  });
});
