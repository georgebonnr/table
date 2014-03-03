module.exports.get = function(req, res, next) {
  var query = req.db.Reservation.find({ organization: req.session.organization });
  if (req.query.start) {
    query = query.where('time').gt(req.query.start);
    delete req.query.start;
  }
  if (req.query.end) {
    query = query.lt(req.query.end);
    delete req.query.end;
  }
  query = query.find(req.query);
  query.limit(100).exec(function (err, data) {
    if (err) next(err);
    res.json(200, {data:data});
  });
};

module.exports.getOne = function(req, res, next) {
  req.db.Reservation.findById(req.params.id, function(err, data) {
    if (err) next(err);
    res.json(200, data);
  });
};

module.exports.create = function(req, res, next) {
  console.log('body',req.body);
  if (!req.body.organization) {
    req.body.organization = req.session.organization;
  }
  req.db.Reservation.create(req.body, function(err, data){
    if (err) { next(err); }
    if (data._id) { res.set('location', req.url + data._id); }
    res.send(201,data);
  });
};

module.exports.update = function(req, res, next) {
  req.db.Reservation.findByIdAndUpdate(req.params.id, { $set: req.body}, function(err, data){
    if (err) { next(err); }
    if (data._id) { res.set('location', req.url + data._id); }
    res.send(201, data);
  });
};

module.exports.delete = function(req, res, next) {
  req.db.Reservation.findByIdAndRemove(req.params.id, function(err, data){
    if (err) next(err);
    res.send(200, data);
  });
};
