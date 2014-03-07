angular.module('client', [])
.factory('apiRequest', function($http){
  var path = '/api/v1';

  var methods = {
    get: function(resource){
      // use these methods as helpers for api calls –- integrate promises?
      $http.get(path + resource).success(function(data, status, headers, config){
      }).error(function(error, status, headers, config){
      });
    },
    getOne: function(resource, id){
      // for getting single resources
    },
    post: function(resource){
      // creating reservations, etc.
    },
    put: function(resource){
      //updating
    },
    delete: function(resource){
      //delete reservations
    }
  };
  return methods;
});
