module.exports = function(req, res) {
  console.info('Logout USER: ' + req.session.userId);
  req.session.auth = false;
  req.session.user = null;
  req.session.admin = null;
  req.session.destroy(function(error) {
    if (!error) {
      res.redirect('/login');
    }
  });
};
