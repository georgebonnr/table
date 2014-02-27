// pass in lifespan in minutes to create both short and long caches.
var MakeCache = function(lifespan){
  var storage = {};
  return {
    remove: function(url) {
      delete storage[url];
    },
    contains: function(url) {
      return storage.hasOwnProperty(url) && storage[url] !== null;
    },
    get: function(url) {
      return storage[url];
    },
    set: function(url, data, callback) {
      // this.remove(url);
      storage[url] = data;
      setTimeout(function(){
        this.remove(url);
      }.bind(this), 1000 * 60 * lifespan);

      if ($.isFunction(callback)) { callback(data); }
    }
  };
};

// usage pattern:
// $(function () {
//   var url = '/echo/jsonp/';
//   $('#ajaxButton').click(function (e) {
//     $.ajax({
//       url: url,
//       data: {
//         test: 'value'
//       },
//       cache: true,
//       beforeSend: function () {
//         return localCache.exist(url) ? false : true;
//       },
//       complete: function (jqXHR, textStatus) {
//         localCache.set(url, jqXHR, doSomething);
//       }
//     });
//   });
// });

// function doSomething(data) {
//     console.log(data);
// }
