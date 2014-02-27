module.exports.get = function(req, res, next) {
  var query = req.db.User.find({ 'organization.username' : req.session.organization }, '-creditCards');
  if (req.query.createdAfter) {
    query = query.where('created').gt(req.query.createdAfter);
    delete req.query.createdAfter;
  }
  if (req.query.createdBefore) {
    query = query.lt(req.query.createdBefore);
    delete req.query.createdBefore;
  }
  query = query.find(req.query);
  query.limit(100).exec(function (err, data) {
    if (err) next(err);
    res.json(200, {data:data});
  });
};

module.exports.getOne = function(req, res, next) {
  req.db.User.findById(req.params.id, function(err, data) {
    if (err) next(err);
    res.json(200, data);
  });
};

module.exports.create = function(req, res, next) {
  req.db.User.create(req.body, function(err, data){
    if (err) { next(err); }
    if (data && data._id) { res.set('location', req.url + data._id); }
    res.send(201,data);
  });
};

module.exports.update = function(req, res, next) {
  req.db.User.findByIdAndUpdate(req.params.id, { $set: req.body}, function(err, data){
    if (err) { next(err); }
    if (data._id) { res.set('location', req.url + data._id); }
    res.send(201, data);
  });
};

module.exports.delete = function(req, res, next) {
  req.db.User.findByIdAndRemove(req.params.id, function(err, data){
    if (err) next(err);
    res.send(200, data);
  });
};
