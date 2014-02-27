module.exports = function(req, res, next){
  req = req.req || req;
  if (req.session.auth){
    return next();
  }

  var auth = req.headers.authorization;
  if (!auth) { return res.send(401); }

  var parts = auth.split(' ');
  if ('basic' != parts[0].toLowerCase()) return;
  if (!parts[1]) return;
  auth = parts[1];

  auth = new Buffer(auth, 'base64').toString();
  auth = auth.match(/^([^:]+):(.+)$/);
  if (!auth) return;

  req.u = auth[1];
  req.p = auth[2];
  next();
};
