exports.login = function(req, res, next) {
  req.session.organization = req.session.organization || req.subdomains[0];
  req.db.User.findOne(
    {
      email: req.body.email
    },
    'firstName lastName nickname password organizations',
    {
      safe: true,
      lean: true
    },
    function(err, user) {
      if (err) { return next(err); }
      var hasOrganization;
      if (user && user.password === req.body.password) {
        hasOrganization = user.organizations.length;
        if (!hasOrganization){
          return res.send(401, "You do not have employee access");
        }
        if (!(req.session.organization && user.organizations.indexOf(req.session.organization) != -1)){
          req.db.Organization.find(
          {
            username: { $in: user.organizations }
          },
          'displayName',
          function(err, organizations){
            if(err){return next(err);}
            if (hasOrganization > 1){
              var obj = {
                organizations: organizations,
                roles: user.roles
              };
              res.send({msg: obj});
            } else {
              req.session.organization = (user.organizations[0]);
              res.send(user);
            }
          });
        }
        if (user.roles.indexOf('admin') != -1){ req.session.admin = true; }
        req.session.auth = true;
        req.session.userId = user._id.toHexString();
        req.session.user = user;
        res.send(user);
      } else {
        res.send(401, 'Email or password not recognized');
      }
  });
};
