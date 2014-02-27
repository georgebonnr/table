module.exports.get = function(req, res, next) {
  if (req.query.time) {
    req.db.User.find({ organizations: req.session.organization,
      created: {$gte: req.query.time} }, '',
      {limit: 100}, function(err, data) {
        if (err) next(err);
        res.json(200, {data:data});
      });
  } else {
    req.db.User.find({organizations: req.session.organization}, '', {limit: 100}, function(err, data) {
      if (err) next(err);
      res.json(200, data);
    });
  }
};

module.exports.getOne = function(req, res, next) {
  req.db.User.findById(req.id, function(err, data) {
    if (err) next(err);
    res.json(200, data);
  });
};

module.exports.create = function(req, res, next) {
  req.db.User.create(req.body, function(err, data){
    if (err) { next(err); }
    res.set('location', req.url + data._id);
    res.json(201,data);
  });
};

module.exports.update = function(req, res, next) {
  req.db.User.findByIdAndUpdate(req.id, req.body, function(err, data){
    if (err) next(err);
    res.set('location', req.url + data._id);
    res.json(200, data);
  });
};

module.exports.delete = function(req, res, next) {
  req.db.User.findByIdAndRemove(req.id, req.id, function(err, data){
    if (err) next(err);
    res.set('location', req.url + data._id);
    res.json(200, data);
  });
};
