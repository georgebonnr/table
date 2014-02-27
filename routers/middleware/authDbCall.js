module.exports = function(req, res, next){
  var subdomain = req.subdomains[0];
  req.db.User.findOne(
    {
      email: req.body.u
    },
    'email password organizations created updated',
    {
      safe: true,
      lean: true
    },
    function(err, user) {
      var o, organizations;
      if (err) { return next(err); }
      if (user && user.password === req.body.p) {
        organizations = user.organizations;
        for (var i=0; i<organizations.length; i++){
          o = organizations[i];
          if (o.username === subdomain){
            req.session.auth = true;
            req.session.organization = o.username;
            if (o.admin){ req.session.admin = true; }
            req.session.user = user.email;
            req.session.cookie.expires = false;
            delete user.password;
            req.user = user;
            return next();
          }
        }
        res.send(401,{error: "Insufficient Authorization"});
      } else {
        res.send(401,{error: "Invalid Credentials"});
      }
  });
};
