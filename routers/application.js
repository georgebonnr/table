var app     = require('../app'),
    db      = require('./middleware/db'),
    auth    = require('./middleware/auth');
    routes  = require('./routes');

module.exports = function(){
  app.post('/login', db, function(req, res){ res.send({ msg: 'success', location: '/home' }); });
  app.get('/', auth.checkLogin, function(req, res){ res.redirect('/home'); });
  app.get('*', auth.checkLogin);
  app.get('/logout', routes.logout);
};
