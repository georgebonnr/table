module.exports.get = function(req, res, next) {
  req.db.Organization.findOne({username: req.session.organization}, 'tables', function(err, data) {
    if (err) next(err);
    console.log('tables',data);
    res.json(200, data);
  });
};
