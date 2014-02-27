module.exports = function(){
  require('./sessions')();
  require('./settings')();
  require('./routing')();
  require('./errors')();
};
