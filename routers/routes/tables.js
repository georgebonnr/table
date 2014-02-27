function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key)){
      return false;
    }
  }
  return true;
}


module.exports.get = function(req, res, next) {
  var query = req.db.Organization.findOne({ username : req.session.organization }, 'tables');
  query.limit(100).lean().exec(function (err, data) {
    if (err) next(err);
    console.log('data',data);
    if (data && data.tables){
      data = data.tables;
      var val;
      var array = [];
      if (isEmpty(req.query)){
        console.log('is empty',data);
        return res.send(200, {data:data});
      } else {
        for (var p in req.query){
          val = req.query[p];
          for (var t in data){
            if (data[t][p].toString() === val){
              array.push(data[t]);
            }
          }
        }
        return res.send(200, {data:array});
      }
    } else {
      return res.send({data:data});
    }
  });
};
