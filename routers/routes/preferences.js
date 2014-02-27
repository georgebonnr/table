
module.exports.get = function(req, res, next) {
  var query = req.db.Organization.findOne({ username : req.session.organization },
    'hours address busyMorning slowMorning busyMidday slowMidday busyEvening slowEvening walkInPercentageRegular walkInPercentageBusy walkInPercentageSlow displayName employees');
  query.limit(100).lean().exec(function (err, data) {
    if (err) next(err);
    if (data && data.preferences){
      data = data.preferences;
      res.send(200, {data:data});
    } else {
      res.send({data:data});
    }
  });
};

module.exports.update = function(req, res, next) {
  console.log(req.body);
  req.db.Organization.findOneAndUpdate({ username : req.session.organization}, { $set: req.body }, function(err, data){
    if (err) { next(err); }
    res.send(201, data);
  });
  var query = req.db.Organization.findOne({ username : req.session.organization }, '');
  query.update({ $set: { preferences: 'foo' }}).exec(function (err, data) {
    if (err) { next(err); }
    res.send(200, {data:data});
  });
};
