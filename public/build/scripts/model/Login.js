angular.module('client').controller('Login', function($scope, $http){
  $scope.error = null;

  $scope.login = function(){
    var data = {
      u: this.username,
      p: this.password
    };
    $http.post('/login', data).success(function(data){
      window.location = data.location;
    }).error(function(err, status, headers, config){
      var msg = err.error;
      if (status == 400){
        msg = msg + ' (use 127.0.0.1 instead of localhost)';
      } else if (status == 403){
        msg = 'Not authorized to access that resource.';
      } else if (status == 401){
        msg = 'Email or password not found.';
      }
      renderError(modalNotification, msg);
    });
  };

  function renderError(node, msg){
    $scope.error = msg;
    node.finish().slideDown().delay(5000).slideUp();
  }
});
