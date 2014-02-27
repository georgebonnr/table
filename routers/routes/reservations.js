module.exports.get = function(req, res, next) {
  if (req.query.time) {
    var date = new Date(req.query.time);
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var startHour = hour - 1;
    var endHour = hour + 2;
    var startMinutes = 0;
    var endMinutes = 30;
    console.log(minutes, typeof minutes);
    if (minutes == 30){
      startMinutes = 30;
      endMinutes = 0;
    }
    start = new Date(year,month,day,startHour,startMinutes).toISOString();
    end = new Date(year,month,day,endHour,endMinutes).toISOString();
    req.db.Reservation.find({ organization: req.session.organization,
      time: {$gt: start, $lte: end} }, '',
      {limit: 100}, function(err, data) {
        if (err) next(err);
        res.json(200, {data:data});
      });
  } else {
    req.db.Reservation.find({organization: req.session.organization}, '', {limit: 100}, function(err, data) {
      if (err) next(err);
      res.json(200, data);
    });
  }
};

module.exports.getOne = function(req, res, next) {
  req.db.Reservation.findById(req.id, function(err, data) {
    if (err) next(err);
    res.json(200, data);
  });
};

module.exports.create = function(req, res, next) {
  req.db.Reservation.create(req.body, function(err, data){
    if (err) { next(err); }
    res.set('location', req.url + data._id);
    res.json(201,data);
  });
};

module.exports.update = function(req, res, next) {
  req.db.Reservation.findByIdAndUpdate(req.id, req.body, function(err, data){
    if (err) next(err);
    res.set('location', req.url + data._id);
    res.json(200, data);
  });
};

module.exports.delete = function(req, res, next) {
  req.db.Reservation.findByIdAndRemove(req.id, req.id, function(err, data){
    if (err) next(err);
    res.set('location', req.url + data._id);
    res.json(200, data);
  });
};
