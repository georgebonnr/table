
module.exports.checkLogin = function(req, res, next) {
  if (!(req.session && req.session.auth && req.session.user)) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports.loginHelper = function(req, res, next){
  if (req.path !== '/'){
    // hack
    if (req.path.indexOf('.html') != -1 || req.path[req.path.length-1] === '/'){
      res.redirect('/login');
    } else {
      next();
    }
  } else {
    next();
  }
};

module.exports.webAdmin = function(req, res, next) {
  if (req.session && req.session.auth && req.session.user && req.session.admin) {
  } else {
    req.needsAdmin = true;
  }
  next();
};

module.exports.apiOrg = function(req, res, next) {
  if (req.session && req.session.auth && req.session.user) {
  } else {
    req.needsAuth = true;
  }
  next();
};

module.exports.apiAdmin = function(req, res, next) {
  if (req.session && req.session.auth && req.session.user) {
  } else {
    req.needsAuth = true;
  }
  next();
};
